// Skrypt do zmiany trybu ciemnego
function przelaczDarkmode() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    const filtry = document.getElementById('filters');
    const przyciskKontakt = document.querySelector('.email-form button');

    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    filtry.classList.toggle('dark-mode');

    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        link.classList.toggle('dark-mode');
    });

    const przyciski = document.querySelectorAll('header nav ul li button');
    przyciski.forEach(button => {
        button.classList.toggle('dark-mode');
    });
    przyciskKontakt.classList.toggle('dark-mode');

    const czyJestDarkmode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', czyJestDarkmode ? 'enabled' : 'disabled');
}
// zapisywany jest stan strony
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    przelaczDarkmode(); 
}