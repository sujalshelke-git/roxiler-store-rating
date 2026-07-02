import { Router } from "express";
import { Role } from "@prisma/client";

import {
  dashboard,
  changePassword,
} from "../controllers/owner.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize(Role.OWNER));

router.get("/dashboard", dashboard);

router.put(
  "/change-password",
  changePassword
);

export default router;