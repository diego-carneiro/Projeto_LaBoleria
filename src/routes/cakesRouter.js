import { Router } from "express";
import { postCakes, getCakes } from "../controllers/cakesController.js"
import cakesMiddleware from "../middlewares/cakesMiddleware.js";

const cakeRouter = Router();

cakeRouter.post('/cakes',
    cakesMiddleware,
    postCakes
);
cakeRouter.get('/categories',
    getCakes
);

export default cakeRouter;