import { Router } from "express";
import { postClients } from "../controllers/clientsController.js";
import clientsMiddleware from "../middlewares/clientsMiddleware.js"

const clientsRouter = Router();

clientsRouter.post('/clients',
    clientsMiddleware,
    postClients
);


export default clientsRouter;