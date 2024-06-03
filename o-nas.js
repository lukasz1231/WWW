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
}
