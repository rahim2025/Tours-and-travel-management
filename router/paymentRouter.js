const express = require("express");
const router = express.Router();
// const { isLoggedIn } = require("../middleware.js");
const paymentController = require("../controller/payment.js");

router.get("/", paymentController.paymentPortal);
router.post("/processPayment-credit", paymentController.processCreditCardPayment);
router.post("/processPayment-mobile", paymentController.processMobileBankingPayment);

module.exports = router;