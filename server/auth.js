const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get('/', function (err, req, res, next) {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
});

authRouter.post('/', passport.authenticate("local", {
    session: false
})
);

module.exports = authRouter;