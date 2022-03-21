import cakesSchema from "../schemas/cakesSchema.js";

export default function cakesMiddleware(request, response, next) {

    const validation = cakesSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.status(400).send(validation.error.details[0].message);
    }

   

    next();
}