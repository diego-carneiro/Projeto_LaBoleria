import clientsSchemas from "../schemas/clientsSchemas.js"

export default function clientsMiddleware(request, response, next) {

    const validation = clientsSchemas.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(422);
    }

    next();
}