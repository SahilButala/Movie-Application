const Joi = require("joi");

const movieValidationSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required().messages({
        "string.min": "Name length must be at least 2 characters long"
      }),

    description: Joi.string()
      .trim()
      .min(5)
      .required().messages({
        "string.min": "Description length must be at least 5 characters long"
      }),

    casts: Joi.array()
      .items(Joi.string().trim().min(2))
      .min(1)
      .required().messages({
        "string.min": "casts length must be at least 1 character long"
      }),

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
      .required().messages({
        "string.min": "director length must be at least 2 characters long"
      }),

    releaseStatus: Joi.string()
      .valid("RELEASED", "UPCOMING", "CANCELLED")
      .default("RELEASED")
  })

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  })
};

const updateMovieValidationSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).messages({
      "string.min": "Name length must be at least 2 characters long"
    }),

    description: Joi.string().trim().min(5).messages({
      "string.min": "Description length must be at least 5 characters long"
    }),

    casts: Joi.array()
      .items(Joi.string().trim().min(2))
      .min(1).messages({
        "string.min": "casts length must be at least 1 character long"
      }),

    trailerUrl: Joi.string().uri(),

    language: Joi.array()
      .items(Joi.string().trim())
      .min(1),

    releaseDate: Joi.date().iso(),

    director: Joi.string().trim().min(2).messages({
      "string.min": "director length must be at least 2 characters long"
    }),

    releaseStatus: Joi.string().valid("RELEASED", "UPCOMING", "CANCELLED")
  })
    .min(1); // ✅ at least one field must be provided

  return schema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });
};


module.exports = {
  movieValidationSchema,
  updateMovieValidationSchema
}