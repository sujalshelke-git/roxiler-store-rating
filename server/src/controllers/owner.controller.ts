import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  getOwnerDashboard,
  updateOwnerPassword,
} from "../services/owner.service";

export const dashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await getOwnerDashboard(req.user!.id);

    return res.status(200).json({
      success: true,
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

      await updateOwnerPassword(
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