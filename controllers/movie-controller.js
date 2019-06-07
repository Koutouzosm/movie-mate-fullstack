const User = require('../models/User')
const handle = require('../utils/promise-handler')


  const getUsers = async (req, res) => {
    const [movieErr, movieList] = await handle(User.findById(req._id));
    console.log(movieList);
  
    if (movieErr) {
      return res.status(500).json(err);
    }
    console.log(movieList);
    User.find({
      $and: [
        {
          movies: {
            $in: [...movieList.movies]
          }
  
        },
        { _id: { $ne: req._id } }
      ]
    }).then(function (movieMatches) {
      res.json(movieMatches)
    }).catch(function (err) {
      console.log(err);
      res.status(422).json(err)
    })
  }

  const getSavedMovies = (req, res) => {
    User.find({})
      .then(dbMovieData => res.json(dbMovieData))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  };
  
  const saveMovie = (req, res) => {
      console.log('saved movie hit')
    User.findByIdAndUpdate(req.user._id, {
        $push: {movies: req.body}
    }, {new: true})
    .then(dbMovieData => res.json(dbMovieData))
      .catch(err => {
        console.log(err);
        res.json(err);
      });

  };
  
  const removeMovie = (req, res) => {
    movie.remove({
      _id: req.params.id
    })
      .then(dbMovieData => res.json(dbMovieData))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  };
  
  module.exports = {
    getSavedMovies,
    saveMovie,
    removeMovie,
    getUsers
  }