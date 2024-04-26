const searchBox = document.querySelector('#searchBox');
const catFactsApp = document.querySelector('#catFactsApp');
let url = 'https://cat-fact.herokuapp.com/facts/random?amount=500'; // verlinkung zu IPA Datenbank (Fakten)
let url2 = 'https://api.thecatapi.com/v1/images/search?limit=10'; // verlinkung zu zweiter IPA Datenbank (Fotos)

init ();

async function init(){
    let url = 'https://cat-fact.herokuapp.com/facts/random?amount=500';
    let catFacts = await fetchData(url);
    console.log(catFacts[0].text);
    catFacts.forEach(catFact => {
        createItem(catFact);
    });

}

async function search(){
let searchValue = searchBox.value;
let url = `https://cat-fact.herokuapp.com/facts/random?amount=500&text=${searchValue}`;
catFactsApp.innerHTML = '';
let catFacts = await fetchData(url);
catFacts.forEach(catFact => {
    createItem(catFact);
});

}

searchBox.addEventListener('input', search);

function createItem(catFact) {
    let item = document.createElement('div');
    item.classList.add('catFact');
    item.innerHTML = `
        <p>${catFact.text}</p>
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