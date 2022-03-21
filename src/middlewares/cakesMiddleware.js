import cakesSchema from "../schemas/cakesSchema.js";

export default function cakesMiddleware(request, response, next) {

    const validation = cakesSchema.validate(request.body, { abortEarly: true });


    if (validation.error) {
        return response.sendStatus(400);
    }

   

    next();
}