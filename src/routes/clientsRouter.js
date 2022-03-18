import { Router } from "express";
import { postClients } from "../controllers/clientsController.js";
import clientsMiddleware from "../middlewares/clientsMiddleware"

const clientsRouter = Router();

clientsRouter.post('/cakes',
clientsMiddleware,
    postClients
);


export default clientsRouter;