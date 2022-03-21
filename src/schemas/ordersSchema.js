import joi from "joi";

const ordersSchema = joi.object({
    clientId: joi.number().integer().required(),
    cakeId: joi.number().integer().required(),
    quantity: joi.number().min(1).max(5).required(),
    totalPrice: joi.number().integer().required(),
});

export default ordersSchema;