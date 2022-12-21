const router = require('express').Router();
const { sessionController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post(
  '/',
  userMiddleware.getUserByDynamicParam('email'),
  sessionController.create
);

module.exports = router;
