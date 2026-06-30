import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getDashboardData,
  createUser,
} from "../services/admin.service";
import { createUserSchema } from "../validators/admin.validation";
import { createStore } from "../services/admin.service";
import { createStoreSchema } from "../validators/admin.validation";

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

export const addStore = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = createStoreSchema.parse(
      req.body
    );

    const store = await createStore(validatedData);

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  }
);