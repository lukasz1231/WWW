function inicjalizacjaAkordeonow() {
const akordeony = document.querySelectorAll('.accordion');
    akordeony.forEach(accordion => {
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
inicjalizacjaAkordeonow()