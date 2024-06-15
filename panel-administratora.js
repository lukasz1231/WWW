// Funkcja wyświetlająca oferty
function wyswietlOferty(offers) {
    const listaOfert = document.getElementById('offers-list');
    listaOfert.innerHTML = '';

    offers.forEach((offer, index) => {
        const ofertaElement = document.createElement('div');
        ofertaElement.classList.add('offer');

        const formularzEdycji = document.createElement('form');
        formularzEdycji.innerHTML = `
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

            <button type="button" onclick="edycjaOferty(${index})">Zapisz zmiany</button>
            <button type="button" onclick="usunOferte(${index})">Usuń ofertę</button>
        `;
        ofertaElement.appendChild(formularzEdycji);

        listaOfert.appendChild(ofertaElement);
    });
}

// Funkcja zapisująca zmiany w ofercie
function edycjaOferty(index) {
    const marka = document.getElementById(`brand-${index}`).value;
    const typ = document.getElementById(`type-${index}`).value;
    const cena = document.getElementById(`price-${index}`).value;
    const rok = document.getElementById(`year-${index}`).value;
    const vin = document.getElementById(`vin-${index}`).value;
    const zdjecia = document.getElementById(`images-${index}`).value.split(',');

    // Modyfikacja oferty
    const edytowanaOferta = {
        brand: marka,
        type: typ,
        price: cena,
        year: rok,
        vin,
        images: zdjecia
    };

    // Pobranie ofert z localStorage
    let oferty = JSON.parse(localStorage.getItem('offers')) || [];
    oferty[index] = edytowanaOferta;
    localStorage.setItem('offers', JSON.stringify(oferty));

    // Ponowne wyświetlenie ofert
    wyswietlOferty(oferty);

    // Powiadomienie użytkownika o zapisaniu zmian
    alert('Zmiany zostały zapisane.');
}

// Funkcja usuwająca ofertę
function usunOferte(index) {
    // Pobranie ofert z localStorage
    let Oferty = JSON.parse(localStorage.getItem('offers')) || [];
    Oferty.splice(index, 1);
    localStorage.setItem('offers', JSON.stringify(Oferty));

    // Ponowne wyświetlenie ofert
    wyswietlOferty(Oferty);

    // Powiadomienie użytkownika o usunięciu oferty
    alert('Oferta została usunięta.');
}

// Pobranie ofert z localStorage i wyświetlenie ich przy załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    const Oferty = JSON.parse(localStorage.getItem('offers')) || [];
    if (Oferty.length > 0) {
        wyswietlOferty(Oferty);
    }
});

// Dodanie obsługi formularza dodawania nowej oferty
document.getElementById('add-offer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const marka = document.getElementById('brand').value;
    const typ = document.getElementById('type').value;
    const cena = document.getElementById('price').value;
    const rok = document.getElementById('year').value;
    const vin = document.getElementById('vin').value;
    const zdjecia = document.getElementById('images').value.split(',');

    
    const nowaOferta = {
        brand: marka,
        type: typ,
        price: cena,
        year: rok,
        vin,
        images: zdjecia
    };

    
    let oferty = JSON.parse(localStorage.getItem('offers')) || [];
    oferty.push(nowaOferta);
    localStorage.setItem('offers', JSON.stringify(oferty));

    
    document.getElementById('add-offer-form').reset();

    // Powiadomienie użytkownika o dodaniu nowej oferty
    alert('Nowa oferta została dodana.');
});


document.getElementById('clear-offers-button').addEventListener('click', function() {
    
    localStorage.removeItem('offers');
    
    alert('Wszystkie ogłoszenia zostały usunięte.');
});
