const Joi = require('joi');
const { PASSWORD_REGEXP } = require('../constants/regexp');

module.exports = {
  validateUserData: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(PASSWORD_REGEXP).required(),
    confirmPassword: Joi.ref('password'),
  }),
};
