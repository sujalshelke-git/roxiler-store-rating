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

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
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

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);

    // User ID will come from auth middleware later
    const userId = req.user!.id;

    const result = await changePassword(
      userId,
      validatedData.oldPassword,
      validatedData.newPassword
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};