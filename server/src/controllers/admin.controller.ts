import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getDashboardData,
  createUser,
} from "../services/admin.service";
import { createUserSchema } from "../validators/admin.validation";

export const dashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getDashboardData();

    return res.status(200).json({
      success: true,
      data,
    });
  }
);

export const addUser = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = createUserSchema.parse(
      req.body
    );

    const user = await createUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  }
);