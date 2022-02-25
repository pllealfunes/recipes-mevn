var express = require("express");
var router = express.Router();
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { check, validationResult } = require('express-validator');
require("dotenv").config();

router.get('/', function (req, res) {
    console.log("Hello from authController");
});

router.post('/', (req, res, next) => {
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
                bcrypt.compare(password, user.password, (err, req, res) => {
                    if (res) {
                        // passwords match! log user in
                        //done(null, user);
                        //const userJSON = user.toJSON()
                        let token = jwt.sign({ _id: user._id }, process.env.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        console.log(res);
                        res.json({ auth: true, token: token, user: user });

                    } else {
                        // passwords do not match!
                        return done(null, false);
                    }
                });
            });
        })
    );
}
);

module.exports = router;