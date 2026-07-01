import { Router } from "express";

import authApi from "./auth";
import adminApi from "./admin";
import storeApi from "./store";
import ownerApi from "./owner";

const router = Router();

router.use(authApi);
router.use(adminApi);
router.use(storeApi);
router.use(ownerApi);

export default router;