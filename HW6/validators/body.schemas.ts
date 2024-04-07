import Joi from "joi";

export const cartSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().strict().integer().min(0).required(),
});

export const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const currentUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
