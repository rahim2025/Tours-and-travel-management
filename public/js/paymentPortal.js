document.getElementById('creditCardOption').addEventListener('click', function() {
    document.getElementById('paymentCard1').style.display = 'none';
    document.getElementById('paymentCard2').style.display = 'block';
});

document.getElementById('mobileBankingOption').addEventListener('click', function() {
    document.getElementById('paymentCard1').style.display = 'none';
    document.getElementById('paymentCard3').style.display = 'block';
});

document.getElementById('mobileBankingService').addEventListener('change', function() {
    document.getElementById('paymentCard3').style.display = 'none';
    document.getElementById('paymentCard4').style.display = 'block';
});

document.getElementById('verifyPhoneNumber').addEventListener('click', function() {
    document.getElementById('paymentCard4').style.display = 'none';
    document.getElementById('paymentCard5').style.display = 'block';
});

document.getElementById('confirmPayment').addEventListener('click', function() {
    alert('Payment confirmed!');
    window.location.href = '/';
});