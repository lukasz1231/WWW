document.addEventListener('DOMContentLoaded', (event) => {
    initializeCarousels();
    initializeAccordions();
    initializeFilters();
});

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        let slides = carousel.getElementsByClassName('slide');
        slides[0].classList.add('active');
        carousel.dataset.currentSlide = 0;
    });
}

function changeSlide(n, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.getElementsByClassName('slide');
    let currentSlide = parseInt(carousel.dataset.currentSlide);

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    carousel.dataset.currentSlide = currentSlide;
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

function initializeFilters() {
    const priceRange = document.getElementById('price-range');
    const priceLabel = document.getElementById('price-label');
    const brandSelect = document.getElementById('brand-select');
    const typeSelect = document.getElementById('type-select');
    const offers = document.querySelectorAll('.offer');

    // Aktualizuj etykietę ceny
    function updatePriceLabel(value) {
        priceLabel.textContent = `${value} zł`;
    }

    // Filtruj oferty
    function filterOffers() {
        const selectedPrice = parseInt(priceRange.value);
        const selectedBrand = brandSelect.value;
        const selectedType = typeSelect.value;

        offers.forEach(offer => {
            const offerPrice = parseInt(offer.getAttribute('data-price'));
            const offerBrand = offer.getAttribute('data-brand');
            const offerType = offer.getAttribute('data-type');

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

            offer.style.display = showOffer ? 'block' : 'none';
        });
    }

    // Przypisz funkcje do odpowiednich elementów
    priceRange.addEventListener('input', () => {
        updatePriceLabel(priceRange.value);
        filterOffers();
    });

    brandSelect.addEventListener('change', filterOffers);
    typeSelect.addEventListener('change', filterOffers);

    // Wywołaj funkcję filtrowania na początku, aby ukryć nieodpowiednie oferty
    filterOffers();
}
