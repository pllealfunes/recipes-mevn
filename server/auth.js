const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.post('/', passport.authenticate("local", {
    failureFlash: true,
    session: false
})
);

module.exports = authRouter;