import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createServerClient } from "@/lib/supabase";

interface AdminUser extends User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AdminUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const supabase = createServerClient();
          const { data: admin, error } = await supabase
            .from("admins")
            .select()
            .eq("email", credentials.email)
            .single();

          if (error || !admin) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, admin.password);

          if (!isValid) {
            return null;
          }

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const adminUser = user as AdminUser;
        token.id = adminUser.id;
        token.role = adminUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as AdminUser).id = token.id as string;
        (session.user as AdminUser).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
