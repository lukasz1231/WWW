document.addEventListener('DOMContentLoaded', (event) => {
    initializeCarousels();
    initializeAccordions();
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
