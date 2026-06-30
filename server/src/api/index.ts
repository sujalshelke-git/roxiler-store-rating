import { Router } from "express";

import authApi from "./auth";
import adminApi from "./admin";

const router = Router();

router.use(authApi);
router.use(adminApi);

export default router;