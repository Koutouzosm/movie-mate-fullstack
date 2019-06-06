// const router = require('express').Router();
// const passport = require("passport")

// // auth login
// router.get('/login', (req, res) => {
//     res.render('login', {user: req.user})
// });

// // auth logout
// router.get('/logout', (req, res) => {
//     // handle with passport
//     req.logout();
//     res.redirect('/');
// })

// // auth with google
// router.get('/google', passport.authenticate('google',{
//     scope: ["profile"]
// }));

// // callback route for google to redirect to
// router.get("/google/redirect", passport.authenticate('google'), (req,res) => {
//     // res.send(req.user)
//     res.redirect("/profile/")
// });

// module.exports = router;

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