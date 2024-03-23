import Joi from "joi";

export const signupSchemaval = Joi.object({
  name: Joi.string().max(20).min(2).required(),
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  role: Joi.string().valid("admin", "user"),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  repassword: Joi.valid(Joi.ref("password")).required(),
});

export const signinSchemaval = Joi.object({
  email: Joi.string().email({ tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
});

export const changePasswordVal = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  newPassword: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
});
