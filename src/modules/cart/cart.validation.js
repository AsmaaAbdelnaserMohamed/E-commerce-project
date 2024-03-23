import Joi from "joi";

export const addCartSchemaval = Joi.object({
  product: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateQuaSchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().options({ convert: false }).required(),
});
