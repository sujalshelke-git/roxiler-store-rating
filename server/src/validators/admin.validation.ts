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