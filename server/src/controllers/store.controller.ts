import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  getStores,
  addRating,
  updateRating,
  updateUserPassword,
} from "../services/store.service";

import { ratingSchema } from "../validators/store.validation";

export const listStores = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = (req.query.search as string) || "";

    const stores = await getStores(
      req.user!.id,
      page,
      limit,
      search
    );

    return res.status(200).json({
      success: true,
      data: stores,
    });
  }
);

export const submitRating = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData =
      ratingSchema.parse(req.body);

    const result = await addRating(
      req.user!.id,
      req.params.storeId as string,
      validatedData.rating
    );

    return res.status(201).json({
      success: true,
      message:
        "Rating submitted successfully",
      data: result,
    });
  }
);

export const editRating = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData =
      ratingSchema.parse(req.body);

    const result = await updateRating(
      req.user!.id,
      req.params.storeId as string,
      validatedData.rating
    );

    return res.status(200).json({
      success: true,
      message:
        "Rating updated successfully",
      data: result,
    });
  }
);

export const changePassword =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      await updateUserPassword(
        req.user!.id,
        currentPassword,
        newPassword
      );

      return res.status(200).json({
        success: true,
        message:
          "Password updated successfully",
      });
    }
  );