import prisma from "../config/prisma";
import { Role } from "@prisma/client";
import { hashPassword } from "../utils/password";
import { AppError } from "../utils/AppError";

export const getDashboardData = async () => {
  const totalUsers = await prisma.user.count();

  const totalStores = await prisma.store.count();

  const totalRatings = await prisma.rating.count();

  return {
    totalUsers,
    totalStores,
    totalRatings,
  };
};

type CreateUserInput = {
  name: string;
  email: string;
  address: string;
  password: string;
  role: Role;
};

export const createUser = async (
  data: CreateUserInput
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hashPassword(
    data.password
  );

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      password: hashedPassword,
      role: data.role,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  };
};