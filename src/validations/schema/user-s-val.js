const Joi = require("joi")


const userSchemaValidateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(20).required().messages({
            "string.min": "name length must be at least 2 characters long",
            "string.max": "name length maximum be 20 characters long",
            "any.required": "Name is required for Register"
        }),
        email: Joi.string()
            .trim()
            .pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/))
            .required()
            .messages({
                "string.pattern.base": "Email is invalid format"
            }),
        // password : Joi.string().required(),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long",
                "string.pattern.base": "Password must contain uppercase, lowercase, a number, and a special character",
                "any.required": "Password is required"
            }),
        userRole: Joi.string()
            .valid("CUSTOMER", "ADMIN")
            .default("CUSTOMER")
            .messages({
                "any.only": "Role must be either CUSTOMER or ADMIN"
            }),
        userStatus: Joi.string()
            .valid("APPROVED", "REJECTED")
            .default("APPROVED")
            .messages({
                "any.only": "Status must be either APPROVED or "
            }),
    })

    return schema.validate(data)
}


const userSchemaValidateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .trim()
            .pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/))
            .required()
            .messages({
                "string.pattern.base": "Email is invalid format"
            }),
        // password : Joi.string().required(),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long",
                "string.pattern.base": "Password must contain uppercase, lowercase, a number, and a special character",
                "any.required": "Password is required"
            }),
    })

    return schema.validate(data)
}


module.exports = {
    userSchemaValidateRegister,
    userSchemaValidateLogin
}