const { User } = require('../models');

user.save(err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error registering new user, please try again."
      });
    }
    else {
      userSelection = [...req.body.movies];
      console.log(userSelection)
      res.status(200).json({
        success: true,
        message: "Welcome to the club!"
      });
    }
  });

  const getMovies = async (req, res) => {
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