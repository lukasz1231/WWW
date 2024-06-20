

// Skrypt do zmiany trybu ciemnego
function przelaczDarkmode() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    const filtry = document.getElementById('filters');
    const przyciskKontakt = document.querySelector('.email-form button');

    if(body) body.classList.toggle('dark-mode');
    if(header) header.classList.toggle('dark-mode');
    if(footer) footer.classList.toggle('dark-mode');
    if(main) main.classList.toggle('dark-mode');
    if(filtry) filtry.classList.toggle('dark-mode');

    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        if(link) link.classList.toggle('dark-mode');
    });

    const przyciski = document.querySelectorAll('header nav ul li button');
    przyciski.forEach(button => {
        if(button) button.classList.toggle('dark-mode');
    });
    if(przyciskKontakt) przyciskKontakt.classList.toggle('dark-mode');

    if(body) {
    const czyJestDarkmode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', czyJestDarkmode ? 'enabled' : 'disabled');
    }
}
// zapisywany jest stan strony
document.addEventListener('DOMContentLoaded', function () {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        przelaczDarkmode(); 
    }    
});