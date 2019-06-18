const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('./keys');
const { User } = require('../models')

passport.serializeUser((user, done)=> {
   done(null, user.id);
});

passport.deserializeUser((id, done)=> {
   User.findById(id).then((user) => {
      done(null, user);
   });
});


const redirectPath = process.env.NODE_ENV === "production" ? ('https://movie-mate-fullstack.herokuapp.com/auth/google/redirect') : ("http://localhost:3001/auth/google/redirect")

passport.use(
   new GoogleStrategy({
    // options for the google stratagy
    callbackURL:redirectPath,
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
 }, (accessToken, refreshToken, profile, done) => {
   console.log(profile)
    // Chekc if user already exists in db

    User.findOne({googleid: profile.id}).then((currentUser) => {
       
      if(currentUser){
         // User already exists
         console.log("user is: ", currentUser)
         done(null, currentUser);
      }else {
         // if not, create user in our database
         new User({
            displayName: profile.displayName,
            googleid: profile.id,
            thumbnail: profile._json.picture
         }).save().then((newUser) => {
            console.log('new user created:' + newUser);
            done(null, newUser);
         })
      }
    });

 })
)