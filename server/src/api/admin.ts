import { Router } from "express";
import adminRoutes from "../routes/admin.routes";

const router = Router();

router.use("/admin", adminRoutes);

export default router;