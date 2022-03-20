import { Router } from "express";
import { postOrders } from "../controllers/ordersController.js"
import ordersMiddleware from "../middlewares/ordersMiddleware.js";

const ordersRouter = Router();

ordersRouter.post('/cakes',
    clientsMiddleware,
    postClients
);
ordersRouter.get('/orders',
    getOrders
);
// ordersRouter.get('/orders/:id',
//     getCakes
// );


export default ordersRouter;