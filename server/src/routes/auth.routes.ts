import { Router } from "express";
import {
  signup,
  login,
  updatePassword,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.put(
  "/change-password",
  authenticate,
  updatePassword
);

export default router;