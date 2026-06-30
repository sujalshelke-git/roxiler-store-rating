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

type CreateStoreInput = {
  name: string;
  email: string;
  address: string;
  ownerId: string;
};

export const createStore = async (
  data: CreateStoreInput
) => {
  // Email already used?
  const existingStore = await prisma.store.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingStore) {
    throw new AppError("Store email already exists", 400);
  }

  // Owner exists?
  const owner = await prisma.user.findUnique({
    where: {
      id: data.ownerId,
    },
  });

  if (!owner) {
    throw new AppError("Owner not found", 404);
  }

  // Must be OWNER
  if (owner.role !== Role.OWNER) {
    throw new AppError(
      "Selected user is not a store owner",
      400
    );
  }

  // Owner can own only one store
  const ownerStore = await prisma.store.findUnique({
    where: {
      ownerId: data.ownerId,
    },
  });

  if (ownerStore) {
    throw new AppError(
      "Owner already has a store",
      400
    );
  }

  const store = await prisma.store.create({
    data: {
      name: data.name,
      email: data.email,
      address: data.address,
      ownerId: data.ownerId,
    },
  });

  return store;
};