const { bcryptHelper, jwtHelper } = require('../utils');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { password: hashedPassword, id, name } = req.user;
      const { password } = req.body;

      await bcryptHelper.compare(hashedPassword, password);

      const token = jwtHelper.generateToken(id, name);

      res.json({
        token,
      });
    } catch (e) {
      next(e);
    }
  },
};
