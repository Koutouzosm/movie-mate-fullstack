const User = require('../models/User')
const handle = require('../utils/promise-handler')

 const getMe = async (req, res) => {
    console.log(req.user._id);
    const [movieErr, movieList] = await handle(User.findById(req.user._id));
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
        { _id: { $eq: req.user._id } }
      ]
    }).then(function (me) {
      res.json(me)
    }).catch(function (err) {
      console.log(err);
      res.status(422).json(err)
    })
  }


  const getUsers = async (req, res) => {
    console.log(req.user._id);
    const [movieErr, movieList] = await handle(User.findById(req.user._id));
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
        { _id: { $ne: req.user._id } }
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
    console.log(typeof req.params.id);
    console.log(req.params.id);
    console.log(req.user._id);
    User.findOneAndUpdate({
      _id: req.user._id
    }, {
      $pull: {
        movies: {
          movieId: parseInt(req.params.id)
        }
      }
    }, { new: true })
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
    getUsers,
    getMe
  }