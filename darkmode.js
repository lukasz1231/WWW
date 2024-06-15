// Skrypt do zmiany trybu ciemnego
function przelaczDarkmode() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    const filters = document.getElementById('filters');
    const contactButton = document.querySelector('.email-form button');

    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    filters.classList.toggle('dark-mode');

    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        link.classList.toggle('dark-mode');
    });

    const buttons = document.querySelectorAll('header nav ul li button');
    buttons.forEach(button => {
        button.classList.toggle('dark-mode');
    });
    contactButton.classList.toggle('dark-mode');

    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}
// zapisywany jest stan strony
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    przelaczDarkmode(); 
}