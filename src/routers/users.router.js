const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post(
  '/',
  userMiddleware.checkUserValidity,
  userMiddleware.isEmailAvailable,
  userController.createUser
);

module.exports = router;
