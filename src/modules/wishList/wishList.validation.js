import Joi from "joi";

export const addWishListSchemaval = Joi.object({
  product: Joi.string().hex().length(24).required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateWishListSchemaval = Joi.object({
  product: Joi.string().hex().length(24),
});
