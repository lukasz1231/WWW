document.addEventListener("DOMContentLoaded", function() {
    var formButton = document.getElementById("show-form");
    var formContent = document.getElementById("form-content");

    formButton.addEventListener("click", function() {
        if (formContent.style.display === "none") {
            formContent.style.display = "block";
            formButton.textContent = "Ukryj formularz";
        } else {
            formContent.style.display = "none";
            formButton.textContent = "Napisz do nas";
        }
    });
});

// Skrypt do zmiany trybu ciemnego
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

}
// Sprawdź stan trybu ciemnego przy ładowaniu strony
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    toggleDarkMode(); // włącz tryb ciemny jeśli zapisany stan to "enabled"
}

// Skrypt do obsługi przycisku formularza
document.getElementById("przycisk-pokaz").addEventListener("click", function() {
    var formularz = document.getElementById("tresc-formularza");
    if (formularz.style.display === "none") {
        formularz.style.display = "block";
    } else {
        formularz.style.display = "none";
    }
});
