const Joi = require("joi")


const theaterSchemaValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).trim().required().messages({
            "string.min": "Name length must be at least 2 characters long",
            "string.max": "Name length maximum be 10 characters long"
        }),
        description: Joi.string().min(2).max(50).trim().required().messages({
            "string.min": "description length must be at least 2 characters long",
            "string.max": "description length maximum be 50 characters long"
        }),
        pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({
            "string.length": "pincode must be exactly 6 digits",
            "string.pattern.base": "pincode must only contain numbers"
        }),
        city: Joi.string().required(),
        address: Joi.string().trim().optional()
    })

    return schema.validate(data)
}
const updatetheaterSchemaValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).trim().messages({
            "string.min": "Name length must be at least 2 characters long",
            "string.max": "Name length maximum be 10 characters long"
        }),
        description: Joi.string().min(2).max(50).trim().messages({
            "string.min": "description length must be at least 2 characters long",
            "string.max": "description length maximum be 50 characters long"
        }),
        pincode: Joi.string().length(6).pattern(/^[0-9]+$/).messages({
            "string.length": "pincode must be exactly 6 digits",
            "string.pattern.base": "pincode must only contain numbers"
        }),
        city: Joi.string(),
        address: Joi.string().trim().optional()
    })

    return schema.validate(data)
}

module.exports = {
    theaterSchemaValidate,
    updatetheaterSchemaValidate
}