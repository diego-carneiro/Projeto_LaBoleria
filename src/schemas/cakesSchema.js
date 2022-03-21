import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().min(2).required(),
    price: joi.number().integer().min(1).required(),
    description: joi.string().allow("").optional(),
    image: joi.string().uri().required()
});

export default cakesSchema;