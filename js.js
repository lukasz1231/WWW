document.addEventListener("DOMContentLoaded", () => {
    const wineForm = document.getElementById("wineForm");
    const wineTableBody = document.querySelector("#wineTable tbody");
    const searchInput = document.getElementById("search");

    let wines = [];

    wineForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const type = document.getElementById("type").value;
        const year = document.getElementById("year").value;
        const rating = document.getElementById("rating").value;
        const notes = document.getElementById("notes").value;

        const wine = { name, type, year, rating, notes };
        wines.push(wine);
        displayWines(wines);

        wineForm.reset();
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredWines = wines.filter(wine =>
            wine.name.toLowerCase().includes(query) ||
            wine.type.toLowerCase().includes(query) ||
            wine.year.includes(query)
        );
        displayWines(filteredWines);
    });

    function displayWines(wines) {
        wineTableBody.innerHTML = "";
        wines.forEach(wine => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${wine.name}</td>
                <td>${wine.type}</td>
                <td>${wine.year}</td>
                <td>${wine.rating}</td>
                <td>${wine.notes}</td>
            `;
            wineTableBody.appendChild(row);
        });
    }

    window.sortTable = (n) => {
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        const table = document.getElementById("wineTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
});
