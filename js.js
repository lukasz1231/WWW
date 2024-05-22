document.addEventListener('DOMContentLoaded', () => {
    const trailers = [
        {
            name: "Wynajem Naczepy Chłodni Schmitz 2021r.",
            year: 2021,
            price: 4450,
            image: "trailer1.jpg"
        },
        {
            name: "Ładowarka Teleskopowa JCB, MANITOU",
            year: 2021,
            price: 7500,
            image: "trailer2.jpg"
        }
    ];

    const trailersContainer = document.getElementById('trailers');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const addTrailerForm = document.getElementById('addTrailerForm');

    function renderTrailers() {
        trailersContainer.innerHTML = '';
        trailers.forEach((trailer, index) => {
            if (trailer.price <= priceRange.value) {
                const trailerDiv = document.createElement('div');
                trailerDiv.classList.add('trailer');

                trailerDiv.innerHTML = `
                    <img src="${trailer.image}" alt="${trailer.name}">
                    <div class="trailer-details">
                        <h3>${trailer.name}</h3>
                        <p>Rok: ${trailer.year}</p>
                        <p>Cena: ${trailer.price} zł + VAT</p>
                    </div>
                    <div class="trailer-actions">
                        <button onclick="editTrailer(${index})">Edytuj</button>
                        <button onclick="deleteTrailer(${index})">Usuń</button>
                    </div>
                `;

                trailersContainer.appendChild(trailerDiv);
            }
        });
    }

    priceRange.addEventListener('input', () => {
        priceValue.textContent = priceRange.value;
        renderTrailers();
    });

    addTrailerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTrailer = {
            name: addTrailerForm.name.value,
            year: addTrailerForm.year.value,
            price: addTrailerForm.price.value,
            image: addTrailerForm.image.value
        };

        trailers.push(newTrailer);
        renderTrailers();
        addTrailerForm.reset();
    });

    window.editTrailer = (index) => {
        const trailer = trailers[index];
        const newName = prompt("Nowa nazwa:", trailer.name);
        const newYear = prompt("Nowy rok:", trailer.year);
        const newPrice = prompt("Nowa cena:", trailer.price);
        const newImage = prompt("Nowy URL zdjęcia:", trailer.image);

        if (newName) trailer.name = newName;
        if (newYear) trailer.year = parseInt(newYear);
        if (newPrice) trailer.price = parseFloat(newPrice);
        if (newImage) trailer.image = newImage;

        renderTrailers();
    };

    window.deleteTrailer = (index) => {
        trailers.splice(index, 1);
        renderTrailers();
    };

    priceValue.textContent = priceRange.value;
    renderTrailers();
});
