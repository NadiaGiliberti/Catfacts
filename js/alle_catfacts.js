// Daten von API verlinken
const catFactsApp = document.querySelector('#catFactsApp');
let url = 'https://cat-fact.herokuapp.com/facts/random?amount=300'; // Verlinkung zu API Datenbank (Fakten)
let url_2 = 'https://api.thecatapi.com/v1/images/search?limit=10'; // Verlinkung zu zweiter API Datenbank (Fotos)

document.addEventListener("DOMContentLoaded", function() {
    init();

    // Selektieren des Buttons
    let reloadButton = document.getElementById("reloadButton");

    // Hinzufügen eines Event-Listeners für den Klick auf den Button
    reloadButton.addEventListener("click", function() {
        // Neuladen der Seite
        location.reload();
    });
});

// Initialisierung der Anwendung
async function init() {
    try {
        let catFacts = await fetchData(url);
        let catImages = await fetchImage(url_2);

        if (catFacts.length > 0 && catImages && catImages.length > 0) {
            for (let i = 0; i < 4; i++) {
                if (catImages[i] && catImages[i].url) {
                    createItem(catFacts[i], catImages[i]);
                } else {
                    console.error("Bildobjekt fehlt oder hat keine URL.");
                }
            }
        } else {
            console.error("Leeres Array für Fakten oder Bilder.");
        }
    } catch (error) {
        console.error("Fehler bei der Initialisierung:", error);
    }
}

// Durchführen der Suche nach Katzenfakten und Bildern
async function search(searchValue) {
    let searchUrl = `https://cat-fact.herokuapp.com/facts/random?amount=300&text=${searchValue}`;
    let searchUrl2 = `https://api.thecatapi.com/v1/images/search?limit=10&text=${searchValue}`;

    catFactsApp.innerHTML = '';

    try {
        let catFacts = await fetchData(searchUrl);
        let catImages = await fetchImage(searchUrl2);

        for (let i = 0; i < 4; i++) {
            createItem(catFacts[i], catImages[i]);
        }
    } catch (error) {
        console.error("Fehler bei der Suche:", error);
    }
}

// Element mit Katzenfakten und Bildern wird erstellt
function createItem(catFact, catImage) {
    let item = document.createElement('div');
    item.classList.add('catFact');

    let imageUrl = catImage && catImage.url ? catImage.url : 'URL nicht verfügbar';
    item.innerHTML = `
        <img src="${imageUrl}" alt="Cat Image" class="catFact_image">
        <p class="catFact_text">${catFact.text}</p>
    `;
    catFactsApp.appendChild(item);
}

// Hier werden die Daten aus der API geholt
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        let verifiedFacts = data.filter(fact => fact.status.verified === true);
        return verifiedFacts;
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

// Hier werden die Bilder aus der API geholt
async function fetchImage(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Bilder:", error);
    }
}
