const express = require("express");
const User = require("./models/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
require("dotenv").config();

router.get('/', function (req, res) {
    console.log("Hello from userController");
});

router.post("/", [
    check('name', 'Name must have more than 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('password', 'Your password must be at least 5 characters').not().bail().isEmpty().bail().isLength({ min: 5 }).bail(),
    check('email', 'Your email is not valid').not().bail().isEmpty().bail().isEmail().bail().normalizeEmail().bail(),
    check(
        'confirmPassword',
        'Password Confirmation field must have the same value as the password field',
    )
        .exists().bail()
        .custom((value, { req }) => value === req.body.password).bail(),
    check("name").custom(value => {
        return User.find({
            name: value
        }).then(user => {
            if (user.length > 0) {
                // Custom error message and reject
                // the promise
                return Promise.reject('Name already in use');
            }
        });
    }).bail()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //res.render('signUp', { title: 'Sign Up', errors: errors.array() });
        console.log(errors.array());
    } else {
        bcrypt.hash(req.body.password.trim(), 10, (err, hashedPassword) => {
            const newUser = {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                password: hashedPassword
            };
            let user = new User(newUser);
            user.save()
                .then(() => {
                    let token = jwt.sign(
                        { _id: user._id },
                        process.env.secret,
                        { expiresIn: "5m" });
                    if (err) { next(err) }
                    else {

                        res.json({
                            auth: true,
                            user: user,
                            token: token,
                            message: "Signup successful",
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        });
    }
});

module.exports = router;