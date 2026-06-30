import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters")
    .max(60, "Name must not exceed 60 characters"),

  email: z.string().email("Invalid email"),

  address: z
    .string()
    .max(400, "Address must not exceed 400 characters"),

  password: z
    .string()
    .min(8)
    .max(16)
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must contain one uppercase letter and one special character"
    ),

  role: z.nativeEnum(Role),
});

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Store name is required")
    .max(60, "Store name must not exceed 60 characters"),

  email: z.string().email("Invalid email"),

  address: z
    .string()
    .min(1, "Address is required")
    .max(400, "Address must not exceed 400 characters"),

  ownerId: z.string().uuid("Invalid owner id"),
});