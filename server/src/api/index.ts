import { Router } from "express";

import authApi from "./auth";

const router = Router();

router.use(authApi);

export default router;