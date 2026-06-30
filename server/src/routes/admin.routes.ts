import { Router } from "express";
import { Role } from "@prisma/client";

import {
  dashboard,
  addUser,
  addStore,
  listUsers,
  listStores,
  getUserDetails,
} from "../controllers/admin.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router = Router();

router.use(authenticate);
router.use(authorize(Role.ADMIN));

router.get("/dashboard", dashboard);

router.post("/users", addUser);
router.post("/stores", addStore);
router.get("/users", listUsers);
router.get("/stores", listStores);
router.get("/users/:id", getUserDetails);


export default router;