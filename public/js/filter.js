document.getElementById('filterButton').addEventListener('click', function() {
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    const searchInput = document.querySelector('input[name="search"]').value.trim();
    const filterCountryCheck = document.getElementById('filterCountryCheck');
    const filterLocationCheck = document.getElementById('filterLocationCheck');
    const filterPriceCheck = document.getElementById('filterPriceCheck');

    const filterCountry = document.getElementById('filterCountry').value.trim();
    const filterLocation = document.getElementById('filterLocation').value.trim();
    const filterPrice = document.getElementById('filterPrice').value.trim();

    if (!searchInput && filterCountryCheck.checked && !filterCountry) {
        alert('Please enter a country to filter by.');
        event.preventDefault();
        return;
    }

    if (!searchInput && filterLocationCheck.checked && !filterLocation) {
        alert('Please enter a location to filter by.');
        event.preventDefault();
        return;
    }

    if (!searchInput && filterPriceCheck.checked && !filterPrice) {
        alert('Please enter a price to filter by.');
        event.preventDefault();
        return;
    }

    if (!searchInput && !filterCountryCheck.checked && !filterLocationCheck.checked && !filterPriceCheck.checked) {
        alert('Please enter a valid name or select at least one filter option.');
        event.preventDefault();
    }
});