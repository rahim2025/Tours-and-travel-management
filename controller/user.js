const User = require ("../models/user.js");
const ExpressError = require("../utilis/expressError.js");

module.exports.signupForm = (req,res)=>{
    res.render("users/addUser.ejs");
}

module.exports.userSignUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({username,email});
        const registerUser = await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Signup successfully");
            res.redirect("/listings");
        
        });

        
    }
    catch(error){
        req.flash("error","User already exsits");
        res.redirect("/signup");
    }
};

module.exports.loginForm =(req,res)=>{
    res.render("users/userLogin.ejs");
};

module.exports.login = (req, res) => {
    // This function will be called only if authentication is successful
    req.flash("success", "Login successful");
    let redirectUrl = res.locals.saveRedirectUrl || "/listings"
    // if(!res.locals.saveRedirectUrl){
    //     res.redirect("/listings");
    // }
    res.redirect(redirectUrl);
};

module.exports.logout =(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out successful");
        res.redirect("/listings");

    })
};