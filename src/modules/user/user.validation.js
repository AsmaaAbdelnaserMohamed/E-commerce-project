import Joi from "joi";

export const addUserVal = Joi.object({
  name: Joi.string().max(20).min(2).required(),
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
  repassword: Joi.valid(Joi.ref("password")).required(),
  age: Joi.number().integer().max(80).min(10).required(),
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateUserSchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().max(20).min(2),
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  repassword: Joi.valid(Joi.ref("password")),
  age: Joi.number().integer().max(80).min(10),
  role: Joi.string().valid("admin", "user"),
});
