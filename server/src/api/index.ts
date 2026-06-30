import { Router } from "express";

import authApi from "./auth";
import adminApi from "./admin";
import storeApi from "./store";

const router = Router();

router.use(authApi);
router.use(adminApi);
router.use(storeApi);

export default router;