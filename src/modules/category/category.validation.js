import Joi from "joi";

export const addCategorySchemaval = Joi.object({
  name: Joi.string().max(200).min(2).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpg", "image/jpeg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size:Joi.number().max(9999999).required(),
  }).required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateCategorySchemaval = Joi.object({
  name: Joi.string().max(200).min(2),
  id: Joi.string().hex().length(24).required(),
  image: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/png", "image/jpg", "image/jpeg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size:Joi.number().max(9999999).required(),
  })
});
