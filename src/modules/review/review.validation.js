import Joi from "joi";

export const addReviewSchemaval = Joi.object({
  text: Joi.string().max(1000).min(2).required(),
  rate: Joi.number().max(5).min(0).required(),
  product: Joi.string().hex().length(24).required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateReviewSchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  text: Joi.string().max(1000).min(2),
  rate: Joi.number().max(5).min(0),
  product: Joi.string().hex().length(24),
});
