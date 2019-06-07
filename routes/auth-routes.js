
const router = require('express').Router();
const passport = require('passport');

// auth logout
router
  .route('/logout')
  .get((req, res) => {
  // handle with passport
    let redirectPath = (process.env.NODE_ENV === "production") ? "/" : "http://localhost:3000"
    req.logout();
    res.redirect(redirectPath);
  });

// auth with google
router
  .route('/google')
  .get(passport.authenticate('google', {
    scope: ['profile']
    }
  ));

// callback route for google to redirect to
router
  .route('/google/redirect')
  .get(passport.authenticate('google'), (req, res) => {
    let redirectPath = (process.env.NODE_ENV === "production") ? "/search" : "http://localhost:3000"
    redirectPath = `${redirectPath}/search?userId=${req.user._id}`;
    res.redirect(redirectPath);
  });

module.exports = router;