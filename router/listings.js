const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const listingsController = require("../controller/listing.js")

const {isLoggedIn,validateListing,isOwner} = require("../middleware.js");
const {storage} = require("../cloudConfig.js");
const multer  = require('multer');
const upload = multer({storage});



router.get("/", wrapAsync(listingsController.allListings));
//ADD LISTING
router.get("/new",isLoggedIn,listingsController.addListingsForm);

router.post("/",
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingsController.addListings));
//SHOW INDIVISUAL INFO
router.get("/:id", wrapAsync(listingsController.indivisualListings));

//UPDATE LISTINGS
router.get("/:id/edit",isLoggedIn,wrapAsync(listingsController.updateListingsForm));


router.put("/:id",
   upload.single('listing[image]'),
   validateListing,isOwner,
   wrapAsync(listingsController.updateListings));

//Delete listing
router.delete("/:id",isLoggedIn,isOwner,
 wrapAsync(listingsController.deleteListings));

module.exports = router;