const router = require('express').Router();
const movieRoutes = require('./movie-routes');

router.use('/user', movieRoutes);

module.exports = router;