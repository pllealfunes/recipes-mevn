const express = require("express");
const authRouter = express.Router();
const passport = require("passport");


authRouter.post('/', passport.authenticate("local", {
    session: false
})
);

module.exports = authRouter;