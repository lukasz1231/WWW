document.getElementById('dodaj-oferte-formularz').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pobranie danych z formularza
    const marka = document.getElementById('marka').value;
    const typ = document.getElementById('typ').value;
    const cena = document.getElementById('cena').value;
    const rok = document.getElementById('rok').value;
    const vin = document.getElementById('vin').value;
    const zdjecia = document.getElementById('zdjecia').value.split(',');

    // Utworzenie nowego ogłoszenia jako obiekt
    const newOffer = {
        marka,
        typ,
        cena,
        rok,
        vin,
        zdjecia
    };

    // Przechowywanie ogłoszenia w localStorage
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(offers));

    // Resetowanie formularza
    document.getElementById('dodaj-oferte-formularz').reset();

    alert('Ogłoszenie zostało dodane pomyślnie!');
});