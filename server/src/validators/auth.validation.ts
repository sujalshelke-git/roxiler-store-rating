import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters")
    .max(60, "Name must not exceed 60 characters"),

  email: z
    .string()
    .email("Invalid email address"),

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
    )
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(1)
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),

  newPassword: z
    .string()
    .min(8)
    .max(16)
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must contain one uppercase letter and one special character"
    )
});