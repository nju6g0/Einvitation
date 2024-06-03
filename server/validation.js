// https://joi.dev/api/?v=17.13.0
const Joi = require("joi");
const {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
} = require("./constants/auth");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(MIN_USERNAME_LENGTH)
      .max(MAX_USERNAME_LENGTH)
      .required(),
    email: Joi.string().required(),
    password: Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required(),
  });

  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required(),
  });

  return schema.validate(data);
};

const createReceptionValidation = (data) => {
  const schema = Joi.object({
    date: Joi.string().required(),
    venue: Joi.string(),
    venueAddress: Joi.string().required(),
    hostID: Joi.string(),
    availableQuantity: Joi.number(),
  });

  return schema.validate(data);
};

const updateReceptionValidation = (data) => {
  const schema = Joi.object({
    date: Joi.string(),
    venue: Joi.string(),
    venueAddress: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidate,
  createReceptionValidation,
  updateReceptionValidation,
};
