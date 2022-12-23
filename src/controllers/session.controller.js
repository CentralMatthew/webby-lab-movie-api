const { bcryptHelper, jwtHelper } = require('../utils');
const { TOKEN } = require('../constants/tokens');

module.exports = {
  create: async (req, res, next) => {
    try {
      const { password: hashedPassword, id, name } = req.user;
      const { password } = req.body;

      await bcryptHelper.compare(hashedPassword, password);

      const token = jwtHelper.generateToken(id, name);

      res.cookie(TOKEN, token, {
        httpOnly: true,
      });

      res.redirect('/import');
    } catch (e) {
      next(e);
    }
  },
};
