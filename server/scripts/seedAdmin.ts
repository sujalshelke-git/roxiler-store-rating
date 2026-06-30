import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (adminExists) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "System Administrator",
      email: "admin@gmail.com",
      address: "Head Office",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });