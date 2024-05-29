document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    loadOffers();
});

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        let slides = carousel.getElementsByClassName('slide');
        if (slides.length > 0) {
            slides[0].classList.add('active');
            carousel.dataset.currentSlide = 0;
        }
    });
}

function changeSlide(n, carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const slides = carousel.getElementsByClassName('slide');
        let currentSlide = parseInt(carousel.dataset.currentSlide) || 0;

        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            carousel.dataset.currentSlide = currentSlide;
        }
    }
}

function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    });
}

function updatePriceLabel(value) {
    document.getElementById('price-label').textContent = `${value} zł`;
}

function initializeFilters() {
    const priceRange = document.getElementById('price-range');
    const brandSelect = document.getElementById('brand-select');
    const typeSelect = document.getElementById('type-select');
    const yearFromSelect = document.getElementById('year-from-select');
    const yearToSelect = document.getElementById('year-to-select');

    if (priceRange && brandSelect && typeSelect && yearFromSelect && yearToSelect) {
        priceRange.addEventListener('input', () => {
            updatePriceLabel(priceRange.value);
            filterOffers();
        });

        brandSelect.addEventListener('change', filterOffers);
        typeSelect.addEventListener('change', filterOffers);
        yearFromSelect.addEventListener('change', filterOffers);
        yearToSelect.addEventListener('change', filterOffers);
    }

    filterOffers();
}

function filterOffers() {
    const selectedPrice = parseInt(document.getElementById('price-range').value);
    const selectedBrand = document.getElementById('brand-select').value;
    const selectedType = document.getElementById('type-select').value;
    const selectedYearFrom = document.getElementById('year-from-select').value;
    const selectedYearTo = document.getElementById('year-to-select').value;
    const offersContainer = document.getElementById('offers-container');
    const offers = offersContainer.querySelectorAll('.offer');

    offers.forEach(offer => {
        const offerPrice = parseInt(offer.getAttribute('data-price'));
        const offerBrand = offer.getAttribute('data-brand');
        const offerType = offer.getAttribute('data-type');
        const offerYear = parseInt(offer.getAttribute('data-year'));

        let showOffer = true;

        if (offerPrice > selectedPrice) {
            showOffer = false;
        }

        if (selectedBrand !== 'all' && offerBrand !== selectedBrand) {
            showOffer = false;
        }

        if (selectedType !== 'all' && offerType !== selectedType) {
            showOffer = false;
        }

        if (selectedYearFrom !== 'all' && offerYear < parseInt(selectedYearFrom)) {
            showOffer = false;
        }

        if (selectedYearTo !== 'all' && offerYear > parseInt(selectedYearTo)) {
            showOffer = false;
        }

        offer.style.display = showOffer ? 'block' : 'none';
    });
}

function loadOffers() {
    let offers = JSON.parse(localStorage.getItem('offers')) || [];
    const offersContainer = document.getElementById('offers-container');
    
    offersContainer.innerHTML = ''; // Ensure offersContainer is empty before adding new offers

    offers.forEach((offer, index) => {
        const offerElement = document.createElement('div');
        offerElement.className = 'offer';
        offerElement.setAttribute('data-price', offer.price);
        offerElement.setAttribute('data-brand', offer.brand);
        offerElement.setAttribute('data-type', offer.type);
        offerElement.setAttribute('data-year', offer.year);
        
        const carouselId = 'carousel' + index;
        
        offerElement.innerHTML = `
            <div class="carousel" id="${carouselId}">
                <button class="prev" onclick="changeSlide(-1, '${carouselId}')">&#10094;</button>
                ${offer.images && Array.isArray(offer.images) ? offer.images.map((img, idx) => `
                    <img src="${img.trim()}" alt="Oferta ${idx + 1}" class="slide ${idx === 0 ? 'active' : ''}">
                `).join('') : ''}
                <button class="next" onclick="changeSlide(1, '${carouselId}')">&#10095;</button>
            </div>
            <p class="cena">Cena: ${offer.price}zł + VAT/miesiąc</p>
            <button class="accordion">OPIS</button>
            <div class="panel">
                <p><strong>Marka:</strong> ${offer.brand}</p>
                <p><strong>Rok produkcji:</strong> ${offer.year}</p>
                <p><strong>VIN:</strong> ${offer.vin}</p>
                <p><strong>Typ naczepy:</strong> ${offer.type}</p>
            </div>
            <div class="email-form">
                <h4 class="accordion">Skontaktuj się z nami i wynajmij naczepę już dziś:</h4>
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
        
        offersContainer.appendChild(offerElement);
    });

    initializeCarousels();
    initializeAccordions();
}
