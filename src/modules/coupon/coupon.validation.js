import Joi from "joi";

export const addCouponSchemaval = Joi.object({
  code: Joi.string().min(2).required(),
  discount: Joi.number().min(0).required(),
  expires: Joi.date().required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateCouponSchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  code: Joi.string().min(2),
  discount: Joi.number().min(0),
  expires: Joi.date(),
});
