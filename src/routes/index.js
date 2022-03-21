import { Router } from "express";
import cakeRouter from "../routes/cakesRouter.js";
import clientsRouter from "../routes/clientsRouter.js"
import orderRouter from "../routes/ordersRouter.js"

const router = Router();

router.use(cakeRouter);
router.use(clientsRouter);
router.use(orderRouter);

export default router;