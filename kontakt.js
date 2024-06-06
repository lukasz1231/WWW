// Skrypt do zmiany trybu ciemnego
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

}
// zapisywany jest stan strony
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    toggleDarkMode(); 
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
