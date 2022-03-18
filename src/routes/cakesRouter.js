import { Router } from "express";
import { postCakes } from "../controllers/cakesController.js"
import cakesMiddleware from "../middlewares/cakesMiddleware.js";

const cakeRouter = Router();

cakeRouter.post('/cakes',
    cakesMiddleware,
    postCakes
);


export default cakeRouter;