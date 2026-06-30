import { Router } from "express";
import { dashboard } from "../controllers/admin.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize(Role.ADMIN),
  dashboard
);

export default router;