const Joi = require("joi");

const movieValidationSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    description: Joi.string()
      .trim()
      .min(10)
      .required(),

    casts: Joi.array()
      .items(Joi.string().trim().min(2))
      .min(1)
      .required(),

    trailerUrl: Joi.string()
      .uri()
      .required(),

    language: Joi.array()
      .items(Joi.string().trim())
      .min(1)
      .default(["English"]),

    releaseDate: Joi.string()
      .required(), // if you want stricter, we can use date format

    director: Joi.string()
      .trim()
      .min(2)
      .required(),

    releaseStatus: Joi.string()
      .valid("RELEASED", "UPCOMING", "CANCELLED")
      .default("RELEASED")
  })

  return schema.validate(data, {
    abortEarly: false,   
    stripUnknown: true   
  })
};


module.exports = {
  movieValidationSchema
}