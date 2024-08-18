if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}          
const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const path = require ("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilis/expressError.js");
const { error, clear } = require("console");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");



//routers//
const listingsRouter = require("./router/listings.js");
const reviewsRouter = require("./router/reviews.js");
const userRouter = require("./router/userRouter.js");









app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

///////////////////////////Database Connection////////////////////
main().then((res)=>{
    console.log("Database connected");
} )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
////////////////////---------------------------------------------------------////////////////////////
let port =8080;
app.listen(port,()=>{
    console.log(`App is listening at port ${port}` );
});

const sessionOptions = {
    secret:"superSecret",
    resave: false,
    saveUninitialized:true,
    cookie:{
        expire:Date.now()+1000*60*60*24*3,
        maxAge:1000*60*60*24*3,
        httpOnly:true
    },
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  

//middleware for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    
    next();
});

// LISTINGS 
app.use("/listings",listingsRouter);

//Reviews 
app.use("/listings/:id/reviews",reviewsRouter);

//User
app.use("/",userRouter);

//Trip Cost Calculator
app.get('/calculator', (req, res) => {
    res.render('users/costCalculator');
  });

//find tourmate
app.get('/findtourmate', (req, res) => {
    res.render('users/findtourmate');
});

app.get('/alltourmatepost', (req,res) => {
    res.render('users/tourmatepool');
});

//Error Handling//
app.all("*",(req,res,next) =>{
    next(new ExpressError(404,"Page not Found"));
});
//Error Handling//
app.all("*",(req,res,next) =>{
    next(new ExpressError(404,"Page not Found"));
});
  

app.use((err,req,res,next) =>{
    
    let {status=500, message = "some error"} = err;
    res.render("listings/error.ejs",{err});
    
});

