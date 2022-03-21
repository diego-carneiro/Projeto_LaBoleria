import ordersSchema from "../schemas/ordersSchema.js"

export default function ordersMiddleware(request, response, next) {

    const validation = ordersSchema.validate(request.body, { abortEarly: true });

    if (validation.error) {

        if (validation.error.details[0].path[0] === "quantity") {
            return response.sendStatus(400);

        }
        
        return response.sendStatus(404);
    }


    next();
}



