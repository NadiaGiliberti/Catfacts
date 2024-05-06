const catFactsApp = document.querySelector('#catFactsApp');
let url = 'https://cat-fact.herokuapp.com/facts/random?amount=300'; // verlinkung zu API Datenbank (Fakten)
let url_2 = 'https://api.thecatapi.com/v1/images/search?limit=10'; // verlinkung zu zweiter API Datenbank (Fotos)

init();

async function init() {
    let catFacts = await fetchData(url);
    let catImages = await fetchImage(url_2);
    console.log(catFacts[0].text);
    console.log(catImages); // Debugging-Ausgabe hinzufügen
    if (catFacts.length > 0 && catImages && catImages.length > 0) {
        catFacts.forEach((catFact, index) => {
            if (catImages[index] && catImages[index].url) {
                createItem(catFact, catImages[index]);
            } else {
                console.log("Bildobjekt fehlt oder hat keine URL.");
            }
        });
    } else {
        console.log("Leeres Array für Fakten oder Bilder.");
    }
}

async function search(searchValue) {
    let url = `https://cat-fact.herokuapp.com/facts/random?amount=300&text=${searchValue}`;
    let url_2 = `https://api.thecatapi.com/v1/images/search?limit=10&text=${searchValue}`;
    catFactsApp.innerHTML = '';
    let catFacts = await fetchData(url);
    let catImage = await fetchImage(url_2);
    catFacts.forEach((catFact, index) => {
        createItem(catFact, catImage(index));
    });

}


function createItem(catFact, catImage) {
    let item = document.createElement('div');
    item.classList.add('catFact');
    let imageUrl = catImage && catImage.url ? catImage.url : 'URL nicht verfügbar';
    item.innerHTML = `
        <p>${catFact.text}</p>
        <img src="${imageUrl}" alt="Cat Image">
        `;
    catFactsApp.appendChild(item);
}


// Hier werden die Daten aus der API geholt:
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        let verifiedFacts = data.filter(fact => fact.status.verified === true);
        return verifiedFacts;
    }
    catch (error) {
        console.log(error);
    }
}

async function fetchImage(url_2) {
    try {
        let response = await fetch(url_2);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
