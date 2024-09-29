const express = require ("express");
const router = express.Router();
const User = require ("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/expressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.get("/",(req,res)=>{
    res.render("users/home.ejs");
});
router.get("/signup",userController.signupForm);
router.post("/signup", wrapAsync(userController.userSignUp));

router.get("/login",userController.loginForm);

router.post("/login",saveRedirectUrl, passport.authenticate('local', { 
    failureRedirect: '/login',
    failureFlash: true
}), userController.login);

router.get("/logout",userController.logout);

module.exports=router;
