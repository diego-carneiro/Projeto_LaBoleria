import cakesSchema from "../schemas/cakesSchema.js";

export default function cakesMiddleware(request, response, next) {

    const validation = cakesSchema.validate(request.body, { abortEarly: true });

    console.log(validation.error.details[0].message);
    if (validation.error) {
        return response.sendStatus(400);
    }

   

    next();
}