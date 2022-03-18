import { Router } from "express";
import cakeRouter from "../routes/cakesRouter.js";

const router = Router();

router.use(cakeRouter);

export default router;