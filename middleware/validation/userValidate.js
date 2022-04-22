const { Joi } = require("express-validation");

const name = Joi.string().min(4).max(20).required();
const password = Joi.string()
  .min(6)
  .max(25)
  .regex(/[a-zA-Z0-9]{3,30}/)
  .required();
const email = Joi.string().email().exist().required();
const age = Joi.number().min(12);
const role = Joi.string()


const loginValidation = {
  body: Joi.object({
    email,
    password,
  }),
};

const registrationValidation = {
  body: Joi.object({
    name,
    password,
    email,
    age,
    role
  }),
};

const updateValidation = {
  body: Joi.object({
    name,
    password,
    newPassword: password,
    age
  }),
};

module.exports = {
  loginValidation,
  registrationValidation,
  updateValidation,
};
