import ordersSchema from "../schemas/ordersSchema.js"

export default function ordersMiddleware(request, response, next) {

    const validation = ordersSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {
        return response.sendStatus(400);
    }

    next();
}



