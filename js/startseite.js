// POP UP BEIM LADEN DER SEITE

function openPopup(popup) {
    var popup = document.getElementById("popup");
}

function closePopup(popup) {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

document.getElementById("go_for_it").addEventListener("click", function() {
    closePopup("popup");
});

//POP UP BEIM HOVER ÜBER DAS BILD MAUS
function openPopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "flex";
}

function closePopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "none";
}

// EVENT FÜR HOVER ÜBER DAS BILD MAUS
document.getElementById("mouse").addEventListener("mouseover", function() {
    openPopup_fact("popup_fact"); // Das Popup wird nur beim Hover über das Bild "mouse" angezeigt
});

document.getElementById("more_mice").addEventListener("click", function() {
    closePopup_fact("popup_fact");
    init('https://cat-fact.herokuapp.com/facts/random?amount=300', 'https://api.thecatapi.com/v1/images/search?limit=10');
});


// KATZE AN CURSOR
// Fenstergröße erheben
let mouseXprevious = [0];
let mouseYprevious = [0];
//Katze an Cursor fixieren
let cat = document.querySelector('#cat');

function moveCat(posX, posY) {
    let lastMouseX = mouseXprevious[mouseXprevious.length - 1];
    let lastMouseY = mouseYprevious[mouseYprevious.length - 1];

    // Position der Maus relativ zum Mittelpunkt des Bildes berechnen
    let mouseX = posX - lastMouseX;
    let mouseY = posY - lastMouseY;

    // Winkel berechnen und um 90 Grad erhöhen
    let angle = Math.atan2(mouseY, mouseX);
    angle = angle * (180 / Math.PI); // Umrechnung von Bogenmaß in Grad
    angle -= 90; // 90 Grad im Uhrzeigersinn drehen

    // Bild drehen
    cat.style.transformOrigin = 'center';
    cat.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    // Bildposition aktualisieren
    cat.style.left = posX + 'px';
    cat.style.top = posY + 'px';

    // Position des Mauszeigers speichern
    mouseXprevious.unshift(posX);
    mouseYprevious.unshift(posY);

    // Begrenze die Anzahl der gespeicherten Positionen auf 5
    // Je höher die Zahl, desto langsamer reagiert die Maus
    mouseXprevious = mouseXprevious.slice(0, 8);
    mouseYprevious = mouseYprevious.slice(0, 8);
}

document.addEventListener('mousemove', function(e) {
    moveCat(e.clientX, e.clientY);
});

document.addEventListener('touchmove', function(e) {
    // Prevent the default behavior of touch events to avoid scrolling while dragging
    e.preventDefault();
    if (e.touches.length > 0) {
        let touch = e.touches[0];
        moveCat(touch.clientX, touch.clientY);
    }
});

// HOVERZÄHLER

// Laden der aktuellen Hoveranzahl
var hoverCount = parseInt(sessionStorage.getItem('hoverCount')) || 0;
// Funktion zur Aktualisierung der Hoveranzahl-Anzeige
function updateHoverCount() {
    // Laden der aktuellen Hoveranzahl
    hoverCount = parseInt(sessionStorage.getItem('hoverCount')) || 0;
    // Aktualisieren der Anzeige der Hoveranzahl auf dem Bildschirm
    document.getElementById("hoverNumber").textContent = hoverCount;
    if (hoverCount == 0) {
        // Wenn der Hoverzähler 0 ist, zeige das Popup an
        document.getElementById("popup").style.display = "flex";
    } else {
        // Andernfalls, verstecke das Popup
        document.getElementById("popup").style.display = "none";
    }

    let url_param = window.location.search;
    if (hoverCount > 0 && url_param !== '?popup=false') {
        // Wenn der Hoverzähler 0 ist, zeige das Popup an
        document.getElementById("popup_fact").style.display = "flex";
    } else {
        // Andernfalls, verstecke das Popup
        document.getElementById("popup_fact").style.display = "none";

        if (url_param === '?popup=false') {
            let new_url = window.location.origin + window.location.pathname;
            window.history.replaceState(null, '', new_url);
        }
    }
}

function handleMouseHover(event) {
    // Überprüfen, ob das gehoverte Element die ID "mouse" hat
    if (event.target.id === "mouse") {
        // Inkrementiere die Hoveranzahl
        hoverCount++;
        // Speichere die aktualisierte Hoveranzahl im SessionStorage
        sessionStorage.setItem("hoverCount", hoverCount.toString());
        console.log("Erfolgreicher Hover! Gesamtanzahl: " + hoverCount);

        // Aktualisiere die Anzeige der Hoveranzahl auf dem Bildschirm
        updateHoverCount();
    }
}

// Füge den Eventlistener nur dem Element mit der ID "mouse" hinzu, nachdem das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    // Aktualisiere die Anzeige der Hoveranzahl, wenn das DOM geladen ist
    updateHoverCount();
    // Füge den Eventlistener hinzu
    document.getElementById("mouse").addEventListener("mouseover", handleMouseHover);
    document.getElementById("mouse").addEventListener("touchstart", handleMouseHover); // Für Touch-Geräte
});

const popupFact = document.querySelector('#catFact');

init('https://cat-fact.herokuapp.com/facts/random?amount=300', 'https://api.thecatapi.com/v1/images/search?limit=10');

async function init(url, url_2) {
    let catFacts = await fetchData(url);
    let catImages = await fetchImage(url_2);
    console.log(catFacts[0].text);
    console.log(catImages);
    if (catFacts.length > 0 && catImages && catImages.length > 0) {
        for (let i = 0; i < 1; i++) {
            if (catImages[i] && catImages[i].url) {
                createItem(catFacts[i], catImages[i]);
            } else {
                console.log("Bildobjekt fehlt oder hat keine URL.");
            }
        }
    } else {
        console.log("Leeres Array für Fakten oder Bilder.");
    }
}

async function search(searchValue) {
    let url = `https://cat-fact.herokuapp.com/facts/random?amount=300&text=${searchValue}`;
    let url_2 = `https://api.thecatapi.com/v1/images/search?limit=10&text=${searchValue}`;
    popupFact.innerHTML = '';
    let catFacts = await fetchData(url);
    let catImages = await fetchImage(url_2);
    for (let i = 0; i < 1; i++) {
        createItem(catFacts[i], catImages[i]);
    }
}

function createItem(catFact, catImage) {
    popupFact.innerHTML = '';
    let item = document.createElement('div');
    item.classList.add('catFact');
    let imageUrl = catImage && catImage.url ? catImage.url : 'URL nicht verfügbar';
    item.innerHTML = `
    <img src="${imageUrl}" alt="Cat Image" class=catFact_image>
        <p class=catFact_text>${catFact.text}</p>
    `;
    popupFact.appendChild(item);
}

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

// MAUS AN ZUFÄLLIGER POSITION

window.onload = function() {
    var bild = document.getElementById("mouse");
    var aktuelleXPos = 0;
    var aktuelleYPos = 0;
    var schrittweite = 1000; // Die Distanz, um die sich das Bild bewegen soll

    setInterval(function() {
        var maxXPos = window.innerWidth - bild.width;
        var maxYPos = window.innerHeight - bild.height;

        // Zufällige x- und y-Komponenten für die Bewegung
        var deltaX = (Math.random() < 0.5 ? -1 : 1) * schrittweite;
        var deltaY = (Math.random() < 0.5 ? -1 : 1) * schrittweite;

        // Neue Position berechnen
        var neueXPos = aktuelleXPos + deltaX;
        var neueYPos = aktuelleYPos + deltaY;

        // Begrenze die Position, damit das Bild im sichtbaren Bereich bleibt
        neueXPos = Math.max(0, Math.min(maxXPos, neueXPos));
        neueYPos = Math.max(0, Math.min(maxYPos, neueYPos));

        // Aktualisiere die Position des Bildes
        bild.style.left = neueXPos + "px";
        bild.style.top = neueYPos + "px";

        // Speichere die aktuelle Position
        aktuelleXPos = neueXPos;
        aktuelleYPos = neueYPos;
    }, 800); // Ändere die Geschwindigkeit der Bewegung, indem du die Zahl änderst (in Millisekunden)
}
