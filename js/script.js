const searchBox = document.querySelector('#searchBox');
const catFactsApp = document.querySelector('#catFactsApp');
let url = 'https://cat-fact.herokuapp.com/facts/random?amount=500'; // verlinkung zu IPA Datenbank (Fakten)
let url_2 = 'https://api.thecatapi.com/v1/images/search?limit=10'; // verlinkung zu zweiter IPA Datenbank (Fotos)

init ();

async function init(){
    let catFacts = await fetchData(url);
    let catImage = await fetchImage(url_2);
    console.log(catFacts[0].text);
    catFacts.forEach(catFact => {
        createItem(catFact, catImage);
    });

}

async function search(){
let searchValue = searchBox.value;
let url = `https://cat-fact.herokuapp.com/facts/random?amount=500&text=${searchValue}`;
catFactsApp.innerHTML = '';
let catFacts = await fetchData(url);
let catImage = await fetchImage(url_2);
catFacts.forEach(catFact => {
    createItem(catFact, catImage);
});

}

searchBox.addEventListener('input', search);

function createItem(catFact, catImage) {
    let item = document.createElement('div');
    item.classList.add('catFact');
    item.innerHTML = `
        <p>${catFact.text}</p>
        <img src="${catImage[0].url}" alt="Cat Image">
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