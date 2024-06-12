// Funkcja wyświetlająca oferty
function displayOffers(offers) {
    const offersList = document.getElementById('offers-list');
    offersList.innerHTML = '';

    offers.forEach((offer, index) => {
        const offerElement = document.createElement('div');
        offerElement.classList.add('offer');

        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <label for="brand-${index}">Marka:</label>
            <input type="text" id="brand-${index}" name="brand" value="${offer.brand}" required>

            <label for="type-${index}">Typ naczepy:</label>
            <input type="text" id="type-${index}" name="type" value="${offer.type}" required>

            <label for="price-${index}">Cena (zł/miesiąc):</label>
            <input type="text" id="price-${index}" name="price" value="${offer.price}" required>

            <label for="year-${index}">Rok produkcji:</label>
            <input type="text" id="year-${index}" name="year" value="${offer.year}" required>

            <label for="vin-${index}">VIN:</label>
            <input type="text" id="vin-${index}" name="vin" value="${offer.vin}" required>

            <label for="images-${index}">Zdjęcia (URL, oddzielone przecinkami bez spacji):</label>
            <input type="text" id="images-${index}" name="images" value="${offer.images.join(',')}" required>

            <button type="button" onclick="editOffer(${index})">Zapisz zmiany</button>
            <button type="button" onclick="deleteOffer(${index})">Usuń ofertę</button>
        `;
        offerElement.appendChild(editForm);

        offersList.appendChild(offerElement);
    });
}

// Funkcja zapisująca zmiany w ofercie
function editOffer(index) {
    const brand = document.getElementById(`brand-${index}`).value;
    const type = document.getElementById(`type-${index}`).value;
    const price = document.getElementById(`price-${index}`).value;
    const year = document.getElementById(`year-${index}`).value;
    const vin = document.getElementById(`vin-${index}`).value;
    const images = document.getElementById(`images-${index}`).value.split(',');

    // Modyfikacja oferty
    const editedOffer = {
        brand,
        type,
        price,
        year,
        vin,
        images
    };

    // Pobranie ofert z localStorage
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers[index] = editedOffer;
    localStorage.setItem('offers', JSON.stringify(offers));

    // Ponowne wyświetlenie ofert
    displayOffers(offers);

    // Powiadomienie użytkownika o zapisaniu zmian
    alert('Zmiany zostały zapisane.');
}

// Funkcja usuwająca ofertę
function deleteOffer(index) {
    // Pobranie ofert z localStorage
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    offers.splice(index, 1);
    localStorage.setItem('offers', JSON.stringify(offers));

    // Ponowne wyświetlenie ofert
    displayOffers(offers);

    // Powiadomienie użytkownika o usunięciu oferty
    alert('Oferta została usunięta.');
}

// Pobranie ofert z localStorage i wyświetlenie ich przy załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    if (offers.length > 0) {
        displayOffers(offers);
    }
});

// Dodanie obsługi formularza dodawania nowej oferty
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

    // Powiadomienie użytkownika o dodaniu nowej oferty
    alert('Nowa oferta została dodana.');
});


document.getElementById('clear-offers-button').addEventListener('click', function() {
    
    localStorage.removeItem('offers');
    
    alert('Wszystkie ogłoszenia zostały usunięte.');
});
