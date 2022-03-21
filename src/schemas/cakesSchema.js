import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().integer().required(),
    description: joi.string().optional(),
    image: joi.string().required()
});

export default cakesSchema;