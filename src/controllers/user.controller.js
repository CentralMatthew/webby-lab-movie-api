const statusCode = require('../constants/statusCodes');
const { bcryptHelper } = require('../utils');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt.helper');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password, ...userData } = req.body;
      const hashedPassword = await bcryptHelper.hash(password);

      await User.create({ ...userData, password: hashedPassword });

      const token = generateToken();

      res.status(statusCode.CREATED).json({ token });
    } catch (e) {
      next(e);
    }
  },
};
