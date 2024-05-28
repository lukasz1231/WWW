document.addEventListener("DOMContentLoaded", function() {
    var formButton = document.getElementById("przycisk-pokaz");
    var formContent = document.getElementById("tresc-formularza");

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
