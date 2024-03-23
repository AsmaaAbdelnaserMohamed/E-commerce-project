import Joi from "joi";

export const addProductSchemaval = Joi.object({
  title: Joi.string().max(300).min(2).required(),
  description: Joi.string().max(200).min(2).required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  rateCount: Joi.number().min(0).required(),
  rateAvg: Joi.number().min(0).max(5).required(),
  sold: Joi.number().required(),
  quantity: Joi.number().min(0).required(),
  rateAvg: Joi.number().min(0).max(5).required(),
  category:  Joi.string().hex().length(24).required(),
  subCategory:  Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),
  imgCover:Joi.array().items( Joi.object({
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
  })).required(),
  images:Joi.array().items( Joi.object({
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
  })).required()
});

export const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const updateProductSchemaval = Joi.object({
  id: Joi.string().hex().length(24).required(),
  title: Joi.string().max(300).min(2).required(),
  description: Joi.string().max(200).min(2).required(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).required(),
  rateCount: Joi.number().min(0).required(),
  rateAvg: Joi.number().min(0).max(5).required(),
  sold: Joi.number().required(),
  quantity: Joi.number().min(0).required(),
  rateAvg: Joi.number().min(0).max(5).required(),
  category:  Joi.string().hex().length(24).required(),
  subCategory:  Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).optional(),
  imgCover:Joi.array().items( Joi.object({
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
  })),
  images:Joi.array().items( Joi.object({
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
  }))
});
