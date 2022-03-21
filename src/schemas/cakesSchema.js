import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().integer().min(1).required(),
    description: joi.string().optional(),
    image: joi.string().required()
});

export default cakesSchema;