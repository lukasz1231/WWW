document.getElementById('add-offer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pobranie danych z formularza
    const brand = document.getElementById('brand').value;
    const type = document.getElementById('type').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const vin = document.getElementById('vin').value;
    const images = document.getElementById('images').value.split(',');

    // Utworzenie nowego ogłoszenia jako obiekt
    const newOffer = {
        brand,
        type,
        price,
        year,
        vin,
        images
    };

    // Przechowywanie ogłoszenia w localStorage
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(offers));

    // Resetowanie formularza
    document.getElementById('add-offer-form').reset();

    alert('Ogłoszenie zostało dodane pomyślnie!');
});

// Dodajemy obsługę kliknięcia przycisku "Wyczyść"
document.getElementById('clear-offers-button').addEventListener('click', function() {
    // Usuwamy wszystkie ogłoszenia z localStorage
    localStorage.removeItem('offers');
    // Informujemy użytkownika o sukcesie
    alert('Wszystkie ogłoszenia zostały usunięte.');
});
