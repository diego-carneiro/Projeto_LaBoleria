import joi from "joi";

const cakesSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().min(9).max(12).required(),
});

export default cakesSchema;