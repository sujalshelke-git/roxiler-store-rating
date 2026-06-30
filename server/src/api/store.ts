import { Router } from "express";
import storeRoutes from "../routes/store.routes";

const router = Router();

router.use("/stores", storeRoutes);

export default router;