const router = require('express').Router();
const { movieController } = require('../controllers');
const {
  sessionMiddleware,
  movieMiddleware,
  fileMiddleware,
} = require('../middlewares');

router.use('/', sessionMiddleware.checkAuthToken);

router.get('/', movieController.getAll);
router.post(
  '/',
  movieMiddleware.checkMovieValidity,
  movieMiddleware.checkIsMovieUnique,
  movieController.create
);
router.post(
  '/import',
  fileMiddleware.isValidFileExtension,
  fileMiddleware.isFileNotEmpty,
  movieController.importMovies
);

router.use('/:movieId', movieMiddleware.checkIsMovieExist);

router.get('/:movieId', movieController.getById);
router.delete('/:movieId', movieController.delete);
router.patch(
  '/:movieId',
  movieMiddleware.checkMovieValidity,
  movieController.update
);

module.exports = router;
