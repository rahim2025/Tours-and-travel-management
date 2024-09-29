const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");
const findMates = require("../models/findMates.js");

router.get("/",wrapAsync(async(req,res)=>{
    const posts = await findMates.find({}).populate("host");
    res.render("findMates/index",{posts});
}));

router.get("/addNew",isLoggedIn,(req,res)=>{
    res.render("findMates/addNew");
});

router.post("/addNew",isLoggedIn,wrapAsync(async(req,res)=>{
    const newMate = new findMates(req.body.findMates);
    newMate.host = req.user._id;
    await newMate.save();
    req.flash("success","Post created");
    res.redirect("/findMates");
}));

router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await findMates.findByIdAndDelete(id);
    req.flash("success","Post deleted");
    res.redirect("/findMates");
}));
module.exports = router;