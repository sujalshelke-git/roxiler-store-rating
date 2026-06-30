import { Router } from "express";
import { Role } from "@prisma/client";

import {
  dashboard,
  addUser,
} from "../controllers/admin.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(authorize(Role.ADMIN));

router.get("/dashboard", dashboard);

router.post("/users", addUser);

export default router;