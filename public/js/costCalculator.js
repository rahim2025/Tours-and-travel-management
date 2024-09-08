// Function to show the next card based on the given card ID
function showNextCard(currentCard, nextCard) {
    // To check if inputs are empty
    if (validateInputs(currentCard)) {
    // Show next card
    document.getElementById(currentCard).style.display = 'none';
    document.getElementById(nextCard).style.display = 'block';
    }
}

// Function to calculate and display the total cost
function calculateTotalCost() {
    const transportCost = {
        'Bus': 1000,
        'Train': 1500,
        'Airplane': 2500,
    }
    // Retrieve user inputs
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const transportMethod = document.getElementById('transportMethod').value;
    const peopleCount = parseInt(document.getElementById('peopleCount').value, 10);
    const duration = parseInt(document.getElementById('duration').value, 10);
    const accommodationCost = parseFloat(document.getElementById('accommodationCost').value);
    const foodCost = parseFloat(document.getElementById('foodCost').value);
    const miscCost = parseFloat(document.getElementById('miscCost').value);

    // Calculate total cost
    const totalCost = ( (transportCost[transportMethod] * peopleCount * 2) + ((accommodationCost + foodCost + miscCost) * duration * peopleCount) );

    // Display the result
    document.getElementById('sourceDisplay').innerText = `Going From: ${source}`;
    document.getElementById('destinationDisplay').innerText = `Going To: ${destination}`;
    document.getElementById('peopleDisplay').innerText = `Travelers: ${peopleCount} person(s)`;
    document.getElementById('durationDisplay').innerText = `Trip Duration: ${duration} days`;
    document.getElementById('transportDisplay').innerText = `Total ${transportMethod} Ticket Price (Round Trip): ৳${transportCost[transportMethod] * peopleCount * 2}`;
    document.getElementById('accommodationDisplay').innerText = `Total Accommodation Cost: ৳${(accommodationCost * duration * peopleCount).toFixed(2)}`;
    document.getElementById('foodDisplay').innerText = `Total Food Cost: ৳${(foodCost * duration * peopleCount).toFixed(2)}`;
    document.getElementById('miscDisplay').innerText = `Total Miscellaneous Cost: ৳${(miscCost * duration * peopleCount).toFixed(2)}`;
    document.getElementById('totalCost').innerText = `Total Cost: ৳${totalCost.toFixed(2)}`;
    showNextCard('costsCard','result'); // Show the result card
}

// Function to validate the inputs
function validateInputs(currentCard) {
    // Checks if the inputs are empty or not and validates them.
    let inputs = document.querySelectorAll(`#${currentCard} input[required]`);
    for (let input of inputs) {
        if (!input.value) {
            alert('Please fill in all required fields.');
            return false;
        }
    }
    return true;
}