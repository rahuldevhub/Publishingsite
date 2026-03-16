import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Required for NextAuth in App Router — prevents static optimization
// which breaks CSRF token and cookie handling, causing 401s
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
