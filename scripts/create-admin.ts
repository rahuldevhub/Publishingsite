import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.create({
    data: {
      email: "admin@riterapublishing.com",
      password: hashedPassword,
      name: "Admin User",
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
