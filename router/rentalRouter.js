const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const rentalController = require("../controller/rental.js");

router.get("/rent", isLoggedIn, rentalController.rentForm);
router.post("/options", isLoggedIn, rentalController.vehicleOptions);

module.exports = router;