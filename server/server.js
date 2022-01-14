require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const recipesApi = require('./recipes-api');
var userApi = require('./user');
var authApi = require('./auth');
var User = require('./models/userSchema');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
const jwt = require("jsonwebtoken");



server.use(express.json());
server.use(cors());

const mongoose = require('mongoose');

mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
},
    error => {
        console.log("Database could't be connected to: " + error)
    }
)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


//Use passport and bcryptjs to search for user in database and log them in
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, (req, username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                console.log(err);
            }
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    //done(null, user);
                    //const userJSON = user.toJSON()
                    let token = jwt.sign({ id: user.id }, process.env.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    // res.send({ auth: true, "token": token, "user": user });
                    /*return res.send({
                    token: token,
                        message: "Sign in successful",
                    });*/
                } else {
                    // passwords do not match!
                    return done(null, false);
                }
            });
        });
    })
);


//Passport middleware
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Express session
server.use(session({ secret: process.env.secret, resave: false, saveUninitialized: true }));

//Passport middleware
server.use(passport.initialize());
server.use(passport.session());

server.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

server.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Connect flash
server.use(flash());

//Global Vars
server.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
server.use('/api/recipes', recipesApi);
server.use('/api/users', userApi);
server.use('/api/auth', authApi);

server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(3000, () => console.log("Server started!"));