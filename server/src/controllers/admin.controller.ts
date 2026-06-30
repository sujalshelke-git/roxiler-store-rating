import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getDashboardData,
  createUser,
  createStore,
  getUsers,

} from "../services/admin.service";
import { createUserSchema } from "../validators/admin.validation";
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

export const listUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = (req.query.search as string) || "";

    const sortBy =
      (req.query.sortBy as string) || "createdAt";

    const order =
      (req.query.order as "asc" | "desc") || "desc";

    const result = await getUsers(
      page,
      limit,
      search,
      sortBy,
      order
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
);