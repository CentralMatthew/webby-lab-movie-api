const Joi = require('joi');
const { DVD, BLU_RAY, VHS } = require('../constants/videoFormatsEnum');

module.exports = {
  validateMovie: Joi.object({
    title: Joi.string().min(2).max(30),
    year: Joi.number().integer().min(1900).max(2100),
    format: Joi.string().valid(VHS, DVD, BLU_RAY).optional(),
    actors: Joi.array().items(Joi.string().min(1).max(50)).required(),
  }),
};
