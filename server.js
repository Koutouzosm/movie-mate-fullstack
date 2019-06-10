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


app.get("*", (req, res) => {
    res.sendFile(path.resolve (__dirname, "public", "index.html"))
});


// connection to mongoDB

app.use (express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/userdb', { useNewUrlParser: true });


// set up routes
app.use(routes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);



//  create our home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
})


app.listen (PORT, () => {
    console.log(`app now listening for requests on ${PORT}`);
});