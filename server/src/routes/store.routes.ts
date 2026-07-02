import { Router } from "express";
import { Role } from "@prisma/client";

import {
  listStores,
  submitRating,
  editRating,
  changePassword,
} from "../controllers/store.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.use(authorize(Role.USER));

router.get("/", listStores);

router.post("/:storeId/rating", submitRating);

router.put("/:storeId/rating", editRating);


router.put( "/change-password",changePassword);

export default router;