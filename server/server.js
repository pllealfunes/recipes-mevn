require('dotenv').config();
const express = require('express');
const server = express();
var path = require('path');
const cors = require('cors');
const recipesApi = require('./recipes-api');
const userApi = require('./user');
const authApi = require('./auth');
var User = require('./models/userSchema');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
const jwt = require("jsonwebtoken");



server.use(express.json());

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

server.use(cors(corsOptions));

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
server.use('/public', express.static(path.join(__dirname, 'public')));


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

//server.use('/public', express.static('public'));
//Routes
server.use('/api/recipes', recipesApi);
server.use('/api/users', userApi);
server.use('/api/auth', authApi);

server.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(3000, () => console.log("Server started!"));