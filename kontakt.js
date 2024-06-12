// Skrypt do obsługi przycisku formularza
document.getElementById("przycisk-pokaz").addEventListener("click", function() {
    var formularz = document.getElementById("tresc-formularza");
    if (formularz.style.display === "none") {
        formularz.style.display = "block";
    } else {
        formularz.style.display = "none";
    }
});
