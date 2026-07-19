import { Role } from "@prisma/client";
import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

type RegisterUserInput = {
  name: string;
  email: string;
  address: string;
  password: string;
};

export const registerUser = async (data: RegisterUserInput) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create new user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      password: hashedPassword,
      role: Role.USER,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password",401);
  }

  // Compare password
  const isPasswordMatch = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError("Invalid email or password",401);
  }

  // Generate JWT
  const token = generateToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found",404);
  }

  const isPasswordMatch = await comparePassword(
    oldPassword,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError("Old password is incorrect",400);
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};