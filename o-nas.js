function toggleDarkMode() {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');

    const buttons = document.querySelectorAll('header nav ul li button');
    buttons.forEach(button => {
        button.classList.toggle('dark-mode');
    });
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}
 // Sprawdź stan trybu ciemnego przy ładowaniu strony
 const darkMode = localStorage.getItem('darkMode');
 if (darkMode === 'enabled') {
     toggleDarkMode(); // włącz tryb ciemny jeśli zapisany stan to "enabled"
 }

