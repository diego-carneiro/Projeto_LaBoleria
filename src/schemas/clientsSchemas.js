import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().required(),
    address: joi.number().integer().required(),
    phone: joi.string().required(),
});

export default cakesSchema;