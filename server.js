const express = require('express');
const graphqlHTTP = require("express-graphql");
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
const routes = require('./routes');
const path = require('path');
const PORT = process.env.PORT || 3001;



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }

app.use(cookieSession( {
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connection to mongoDB
app.use (express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/userdb', { useNewUrlParser: true });

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use(routes);


app.listen (PORT, () => {
    console.log(`app now listening for requests on ${PORT}`);
});