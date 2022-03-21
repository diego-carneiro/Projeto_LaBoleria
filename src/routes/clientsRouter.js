import { Router } from "express";
import { getClientOrders, postClients } from "../controllers/clientsController.js";
import clientsMiddleware from "../middlewares/clientsMiddleware.js"

const clientsRouter = Router();

clientsRouter.post('/clients',
    clientsMiddleware,
    postClients
);
clientsRouter.get('/clients/:id/orders',
    getClientOrders
);

export default clientsRouter;