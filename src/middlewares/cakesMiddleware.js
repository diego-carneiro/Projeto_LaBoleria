import cakesSchema from "../schemas/cakesSchema.js";

export default function cakesMiddleware(request, response, next) {

    const validation = cakesSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        const imgError = validation.error.details[0].message;
       
        if (imgError.search("image") === 1) {
            return response.sendStatus(422)
        }

        return response.status(400).send(validation.error.details[0].message);
    }

    next();
}