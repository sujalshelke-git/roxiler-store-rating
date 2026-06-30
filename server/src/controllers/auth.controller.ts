import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../services/auth.service";
import {
  signupSchema,
  loginSchema,
  changePasswordSchema,
} from "../validators/auth.validation";

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const updatePassword = async (
  req: Request,
  res: Response
) => {
  try {
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
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};