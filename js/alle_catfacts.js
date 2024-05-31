const catFactsApp = document.querySelector('#catFactsApp');
const url = 'https://cat-fact.herokuapp.com/facts/random?amount=300'; // Verlinkung zu API Datenbank (Fakten)
const url_2 = 'https://api.thecatapi.com/v1/images/search?limit=10'; // Verlinkung zu zweiter API Datenbank (Fotos)

document.addEventListener("DOMContentLoaded", function() {
    init();

    // Selektieren des Buttons
    const reloadButton = document.getElementById("reloadButton");

    // Hinzufügen eines Event-Listeners für den Klick auf den Button
    reloadButton.addEventListener("click", function() {
        // Neuladen der Seite
        location.reload();
    });
});

async function init() {
    try {
        const catFacts = await fetchData(url);
        const catImages = await fetchImage(url_2);

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

async function search(searchValue) {
    const searchUrl = `https://cat-fact.herokuapp.com/facts/random?amount=300&text=${searchValue}`;
    const searchUrl2 = `https://api.thecatapi.com/v1/images/search?limit=10&text=${searchValue}`;

    catFactsApp.innerHTML = '';

    try {
        const catFacts = await fetchData(searchUrl);
        const catImages = await fetchImage(searchUrl2);

        for (let i = 0; i < 4; i++) {
            createItem(catFacts[i], catImages[i]);
        }
    } catch (error) {
        console.error("Fehler bei der Suche:", error);
    }
}

function createItem(catFact, catImage) {
    const item = document.createElement('div');
    item.classList.add('catFact');

    const imageUrl = catImage && catImage.url ? catImage.url : 'URL nicht verfügbar';
    item.innerHTML = `
        <img src="${imageUrl}" alt="Cat Image" class="catFact_image">
        <p class="catFact_text">${catFact.text}</p>
    `;
    catFactsApp.appendChild(item);
}

// Hier werden die Daten aus der API geholt
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const verifiedFacts = data.filter(fact => fact.status.verified === true);
        return verifiedFacts;
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

async function fetchImage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Abrufen der Bilder:", error);
    }
}
