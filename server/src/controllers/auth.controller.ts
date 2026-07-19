import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  getCurrentUser as getCurrentUserService,
} from "../services/auth.service";
import {
  signupSchema,
  loginSchema,
  changePasswordSchema,
} from "../validators/auth.validation";
import { asyncHandler } from "../utils/asyncHandler";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);

  const user = await registerUser(validatedData);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);

  const result = await loginUser(
    validatedData.email,
    validatedData.password
  );

  // Store JWT in HTTP-only Cookie
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result.user,
  });
});

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUserService(req.user!.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = changePasswordSchema.parse(req.body);

    const userId = req.user!.id;

    const result = await changePassword(
      userId,
      validatedData.oldPassword,
      validatedData.newPassword
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});