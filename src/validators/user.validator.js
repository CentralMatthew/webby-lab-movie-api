const Joi = require('joi');
const { PASSWORD_REGEXP, NAME_REGEXP } = require('../constants/regexp');

module.exports = {
  validateUserData: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().pattern(NAME_REGEXP),
    password: Joi.string().pattern(PASSWORD_REGEXP).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
      'any.only': 'Password must match',
    }),
  }),
};
