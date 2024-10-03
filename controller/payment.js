const { creditCards, mobileBanking } = require("../init/payment.js");
const ExpressError = require("../utilis/expressError.js");
let globalPaymentAmount = 0;

module.exports.paymentPortal = (req, res) => {
    const totalCost = req.session.totalCost || 0;
    const percentage = req.session.percentage || 0;
    const paymentAmount = totalCost * percentage;
    globalPaymentAmount = paymentAmount;
    res.render("includes/paymentPortal.ejs", { globalPaymentAmount });
};

module.exports.processCreditCardPayment = (req, res) => {
    const { cardType, cardHolderName, cardNumber, expiryDate, cvv, pin } = req.body;

    try {
        const card = creditCards.find(card => 
            card.cardType === cardType &&
            card.Name === cardHolderName &&
            card.creditCardNumber === cardNumber &&
            card.expiryDate === expiryDate &&
            card.cvv === cvv &&
            card.pin === pin
        );

        if (!card) {
            return res.render("includes/paymentConfirmation.ejs", {
                message: "Invalid credit card details",
                redirectUrl: "/rentals/rent",
                redirectText: "Rentals"
            });
        }

        const [expMonth, expYear] = expiryDate.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        if (currentYear > expYear || (currentYear === expYear && currentMonth > expMonth)) {
            return res.render("includes/paymentConfirmation.ejs", {
                message: "Your credit card is expired.",
                redirectUrl: "/rentals/rent",
                redirectText: "Rentals"
            })
        }

        if (card.balance < globalPaymentAmount) {
            return res.render("includes/paymentConfirmation.ejs", {
                message: "Sorry, this account has insufficient balance!",
                redirectUrl: "/rentals/rent",
                redirectText: "Rentals"
            });
        }

        return res.render("includes/paymentConfirmation.ejs", {
            message: "Payment is successful!",
            redirectUrl: "/",
            redirectText: "Home"
        });

    } catch (error) {
        return res.render("includes/paymentConfirmation.ejs", {
            message: "An unknown error occurred. Payment not comnfirmed.",
            redirectUrl: "/rentals/rent",
            redirectText: "Rentals"
        });
    }
};

module.exports.processMobileBankingPayment = (req, res) => {
    const { mobileBankingService, phoneNumber, mobilePin } = req.body;

    try {
        const account = mobileBanking.find(account => 
            account.service === mobileBankingService &&
            account.phone === phoneNumber &&
            account.pin === mobilePin
        );

        if (!account) {
            return res.render("includes/paymentConfirmation.ejs", {
                message: "Invalid mobile banking details.",
                redirectUrl: "/rentals/rent",
                redirectText: "Rentals"
            });
        }

        if (account.balance < globalPaymentAmount) {
            return res.render("includes/paymentConfirmation.ejs", {
                message: "Sorry, this account has insufficient balance!",
                redirectUrl: "/rentals/rent",
                redirectText: "Rentals"
            });
        }

        return res.render("includes/paymentConfirmation.ejs", {
            message: "Payment is successful!",
            redirectUrl: "/",
            redirectText: "Home"
        });

    } catch (error) {
        return res.render("includes/paymentConfirmation.ejs", {
            message: "An unknown error occurred. Payment not comnfirmed.",
            redirectUrl: "/rentals/rent",
            redirectText: "Rentals"
        });
    }
};