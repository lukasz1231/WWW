document.getElementById('add-offer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const brand = document.getElementById('brand').value;
    const type = document.getElementById('type').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const vin = document.getElementById('vin').value;
    const images = document.getElementById('images').value.split(',');

    
    const newOffer = {
        brand,
        type,
        price,
        year,
        vin,
        images
    };

    
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(offers));

    
    document.getElementById('add-offer-form').reset();

    alert('Ogłoszenie zostało dodane pomyślnie!');
});


document.getElementById('clear-offers-button').addEventListener('click', function() {
    
    localStorage.removeItem('offers');
    
    alert('Wszystkie ogłoszenia zostały usunięte.');
});
