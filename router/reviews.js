const express = require ("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utilis/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const Review = require ("../models/review.js");
const ExpressError = require("../utilis/expressError.js");
const Listing = require ("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");



const validateReview = (req,res,next ) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
};


//post review//
router.post("/", 
    validateReview,isLoggedIn, wrapAsync( async (req,res,next) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review (req.body.review)
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","Review posted");
    
    res.redirect(`/listings/${listing._id}`);
    
}));
/////////// DELETE REVIEW///////////////
router.delete(
"/:reviewId", 
wrapAsync (async (req,res)=>{
    let {id,reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id,{pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
} )); 

module.exports = router;