const creditCards = [
    {
        Name: "Nabeel Ahmed",
        creditCardNumber: "5463108832188593",
        cardType: "mastercard",
        expiryDate: "01/29",
        cvv: "292",
        pin: "1234",
        balance: 100000
    },
    {
        Name:"Alberta Gorczany",
        creditCardNumber:"5444379332906099",
        cardType:"visa",
        expiryDate:"03/27",
        cvv:"066",
        pin: "5432",
        balance: 50000
    },
    {
        Name:"Marlene Tobin",
        creditCardNumber:"5217253221651717",
        cardType:"mastercard",
        expiryDate:"10/26",
        cvv:"779",
        pin: "2134",
        balance: 40000
    },
    {
        Name:"Gene Fahey",
        creditCardNumber:"5399583170939766",
        cardType:"visa",
        expiryDate:"03/26",
        cvv:"349",
        pin: "3333",
        balance: 10000
    },
    {
        Name:"Bonnie Denesik",
        creditCardNumber:"5375600101745837",
        cardType:"mastercard",
        expiryDate:"03/25",
        cvv:"833",
        pin: "4321",
        balance: 20000
    }
];

const mobileBanking = [
    {
        service: "bKash",
        phone: "01712345678",
        pin: "1234",
        balance: 0
    },
    {
        service: "Rocket",
        phone: "01759199595",
        pin: "2580",
        balance: 10000
    },
    {
        service: "Nagad",
        phone: "01314523198",
        pin: "4321",
        balance: 200
    },
    {
        service: "bKash",
        phone: "01623554343",
        pin: "1234",
        balance: 5000
    },
    {
        service: "Nagad",
        phone: "01532728642",
        pin: "9876",
        balance: 100000
    }
];

module.exports = { creditCards, mobileBanking };