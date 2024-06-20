document.addEventListener('DOMContentLoaded', function() {
    inicjalizowanieFiltrow();
    zaladujOferty();
});

// akordeony do opisu i kontaktu 
function inicjalizacjaKaruzeli() {
    const karuzele = document.querySelectorAll('.carousel');
    karuzele.forEach(carousel => {
        let slajdy = carousel.getElementsByClassName('slide');
        if (slajdy.length > 0) {
            slajdy[0].classList.add('active');
            carousel.dataset.currentSlide = 0;
        }
    });
}

// zmiana zdjec za pomoca strzalek 
function zmienZdjecie(n, carouselId) {
    const karuzela = document.getElementById(carouselId);
    if (karuzela) {
        const slajdy = karuzela.getElementsByClassName('slide');
        let aktualnySlajd = parseInt(karuzela.dataset.currentSlide) || 0;

        if (slajdy.length > 0) {
            slajdy[aktualnySlajd].classList.remove('active');
            aktualnySlajd = (aktualnySlajd + n + slajdy.length) % slajdy.length;
            slajdy[aktualnySlajd].classList.add('active');
            karuzela.dataset.currentSlide = aktualnySlajd;
        }
    }
}

function updateCeny(value) {
    document.getElementById('price-label').textContent = `${value} zł`;
}

function inicjalizowanieFiltrow() {
    const przedzialCeny = document.getElementById('price-range');
    const wyborMarki = document.getElementById('brand-select');
    const wyborTypu = document.getElementById('type-select');
    const lataOdWybor = document.getElementById('year-from-select');
    const lataDoWybor = document.getElementById('year-to-select');
    const zapisOpcjiSortowania = document.getElementById('sorting-select');

    if (przedzialCeny && wyborMarki && wyborTypu && lataOdWybor && lataDoWybor) {
        przedzialCeny.addEventListener('input', () => {
            updateCeny(przedzialCeny.value);
            filterOffers();
        });

        wyborMarki.addEventListener('change', filterOffers);
        wyborTypu.addEventListener('change', filterOffers);
        lataOdWybor.addEventListener('change', filterOffers);
        lataDoWybor.addEventListener('change', filterOffers);
        zapisOpcjiSortowania.addEventListener('change', sortowanieOfert);
    }

    filterOffers();
}


function sortowanieOfert() {
    const opcjaSortowania = document.getElementById('sorting-select').value;
    const ofertyKontener = document.getElementById('offers-container');
    const tablicaOfert = Array.from(ofertyKontener.getElementsByClassName('offer'));

    tablicaOfert.sort((a, b) => {
        const cenaA = parseInt(a.getAttribute('data-price'));
        const cenaB = parseInt(b.getAttribute('data-price'));

        if (opcjaSortowania === 'od najniższej') {
            return cenaA - cenaB;
        } else if (opcjaSortowania === 'od najwyższej') {
            return cenaB - cenaA;
        } else {
            return 0; // Dowolne sortowanie, brak zmian
        }
    });

    ofertyKontener.innerHTML = '';
    tablicaOfert.forEach(offer => ofertyKontener.appendChild(offer));
}

// filtrowanie ofert
function filterOffers() {
    const wybranaCena = parseInt(document.getElementById('price-range').value);
    const wybranaMarka = document.getElementById('brand-select').value;
    const wybranyTyp = document.getElementById('type-select').value;
    const wybranyRokOd = document.getElementById('year-from-select').value;
    const wybranyRokDo = document.getElementById('year-to-select').value;
    const ofertyKontener = document.getElementById('offers-container');
    const oferty = ofertyKontener.querySelectorAll('.offer');

    oferty.forEach(offer => {
        const ofertaCena = parseInt(offer.getAttribute('data-price'));
        const ofertaMarka = offer.getAttribute('data-brand');
        const ofertaTyp = offer.getAttribute('data-type');
        const ofertaRok = parseInt(offer.getAttribute('data-year'));

        let pokazOferte = true;

        if (ofertaCena > wybranaCena) {
            pokazOferte = false;
        }

        if (wybranaMarka !== 'all' && ofertaMarka !== wybranaMarka) {
            pokazOferte = false;
        }

        if (wybranyTyp !== 'all' && ofertaTyp !== wybranyTyp) {
            pokazOferte = false;
        }

        if (wybranyRokOd !== 'all' && ofertaRok < parseInt(wybranyRokOd)) {
            pokazOferte = false;
        }

        if (wybranyRokDo !== 'all' && ofertaRok > parseInt(wybranyRokDo)) {
            pokazOferte = false;
        }

        offer.style.display = pokazOferte ? 'block' : 'none';
    });

    sortowanieOfert(); // Sortuj oferty po filtrowaniu
}

function zaladujOferty() {
    let oferty = JSON.parse(localStorage.getItem('offers')) || [];
    const ofertyKontener = document.getElementById('offers-container');
    
    ofertyKontener.innerHTML = ''; // wyczyszczenie kontenera, by uniknac duplikacji ofert

    oferty.forEach((offer, index) => {
        const ofertaElement = document.createElement('div');
        ofertaElement.className = 'offer';
        ofertaElement.setAttribute('data-price', offer.price);
        ofertaElement.setAttribute('data-brand', offer.brand);
        ofertaElement.setAttribute('data-type', offer.type);
        ofertaElement.setAttribute('data-year', offer.year);
        
        const karuzelaID = 'carousel' + index;
        
        ofertaElement.innerHTML = `
            <div class="carousel" id="${karuzelaID}">
                <button class="prev" onclick="zmienZdjecie(-1, '${karuzelaID}')">&#10094;</button>
                ${offer.images && Array.isArray(offer.images) ? offer.images.map((img, idx) => `
                    <img src="${img.trim()}" alt="Oferta ${idx + 1}" class="slide ${idx === 0 ? 'active' : ''}">
                `).join('') : ''}
                <button class="next" onclick="zmienZdjecie(1, '${karuzelaID}')">&#10095;</button>
            </div>
            <p class="cena">Cena: ${offer.price}zł + VAT/miesiąc</p>
            <button class="accordion">OPIS</button>
            <div class="panel">
                <p><strong>Marka:</strong> ${offer.brand}</p>
                <p><strong>Rok produkcji:</strong> ${offer.year}</p>
                <p><strong>VIN:</strong> ${offer.vin}</p>
                <p><strong>Typ naczepy:</strong> ${offer.type}</p>
            </div>
            <div id="formularz-kontaktowy">
                <button class="accordion">Skontaktuj się z nami i wynajmij naczepę już dziś!</button>
                <div class="panel">
                     <form action="mailto:pbtrans@gmail.com" method="post" enctype="text/plain">
                        <label for="email">Twój email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="temat">Temat:</label>
                        <input type="text" id="temat" name="temat">
                        <label for="message">Treść wiadomości:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                        <button type="submit">Wyślij</button>
                    </form>
                </div>
            </div>
        `;
        
        ofertyKontener.appendChild(ofertaElement);
    });

    inicjalizacjaKaruzeli();
    inicjalizacjaAkordeonow(); /* z pliku accordions.js */
}
