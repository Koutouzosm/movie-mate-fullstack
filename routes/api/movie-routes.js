const router = require('express').Router();
const { getSavedMovies, saveMovie, removeMovie, getUsers, getMe } = require('../../controllers/movie-controller');

router
  .route('/')
  .get(getSavedMovies)
  .post(saveMovie);

router.route('/:id').delete(removeMovie);

router
  .route('/matched')
  .get(getUsers);

router
  .route('/me')
  .get(getMe)

module.exports = router;
