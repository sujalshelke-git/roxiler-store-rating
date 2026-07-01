import { Router } from "express";
import ownerRoutes from "../routes/owner.routes";

const router = Router();

router.use("/owner", ownerRoutes);

export default router;