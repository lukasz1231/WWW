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
