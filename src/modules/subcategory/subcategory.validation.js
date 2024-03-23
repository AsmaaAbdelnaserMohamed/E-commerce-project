import Joi from "joi";

export const addsubCategorySchemaval = Joi.object({
  name: Joi.string().max(200).min(2).required(),
  category: Joi.string().hex().length(24).required(),

});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updatesubCategorySchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().max(200).min(2),
  category: Joi.string().hex().length(24),

  
});
