import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.NEW_ADMIN_EMAIL?.trim();
  const password = process.env.NEW_ADMIN_PASSWORD;
  const name = process.env.NEW_ADMIN_NAME?.trim() || "Admin User";
  if (!email || !password || password.length < 14) {
    throw new Error(
      "Set NEW_ADMIN_EMAIL and a NEW_ADMIN_PASSWORD of at least 14 characters before running this script.",
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "admin",
    },
  });

  console.log("Admin user created successfully!", admin.email);
}

main()
  .catch((err) => {
    console.error("Error creating admin user:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
