import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getOwnerDashboard } from "../services/owner.service";

export const dashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getOwnerDashboard(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
);