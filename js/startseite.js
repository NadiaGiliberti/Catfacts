// POP UP BEIM LADEN DER SEITE

// Funktion fürs POP UP öffnen
function openPopup(popup) {
    var popup = document.getElementById("popup");
}

// Funktion fürs POP UP schliessen
function closePopup(popup) {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Event fürs POP UP schliessen, bei klick auf Button
document.getElementById("go_for_it").addEventListener("click", function() {
    closePopup("popup");
});

// POP UP BEIM HOVER ÜBER DAS BILD MAUS

// Funktion fürs POP UP öffnen
function openPopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "flex";
}

// Funktion fürs POP UP schliessen
function closePopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "none";
}

// Das Popup wird nur beim Hover über das Bild "mouse" angezeigt
document.getElementById("mouse").addEventListener("mouseover", function() {
    openPopup_fact("popup_fact"); 
    playHoverSound(); // Sound abspielen
});

// Event fürs POP UP schliessen, bei klick auf Button
document.getElementById("more_mice").addEventListener("click", function() {
    closePopup_fact("popup_fact");
    init('https://cat-fact.herokuapp.com/facts/random?amount=300', 'https://api.thecatapi.com/v1/images/search?limit=10');
});


// Funktion zur Wiedergabe des Hover-Sounds
function playHoverSound() {
    var hoverSound = document.getElementById("hoverSound");
    hoverSound.playbackRate = 2; // Erhöhen Sie die Wiedergabegeschwindigkeit (1.5 ist 50% schneller)
    hoverSound.play();
}

// KATZE AN CURSOR

// Fenstergröße erheben
let mouseXprevious = [0];
let mouseYprevious = [0];

// Katze an Cursor fixieren
let cat = document.querySelector('#cat');
document.addEventListener('mousemove', function(e) {
    let posX = e.clientX;
    let posY = e.clientY;

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
        // Wenn der Hoverzähler größer als 0 ist, zeige das Popup an
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

// Funktion zur Verarbeitung des Maus-Hover-Ereignisses
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
});

const popupFact = document.querySelector('#catFact');

// Initialisieren der Daten und Bilder
init('https://cat-fact.herokuapp.com/facts/random?amount=300', 'https://api.thecatapi.com/v1/images/search?limit=10');

// Initialisieren der Daten
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

// Suche nach Katzenfakten und Bildern
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

// Erstellen eines Elements mit Katzenfakten und Bildern
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

// Abrufen der Daten
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

// Abrufen der Bilder
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

// Initialisierung beim Laden des Fensters
window.onload = function() {
    var bild = document.getElementById("mouse");
    var aktuelleXPos = 0;
    var aktuelleYPos = 0;
    
    setInterval(function() {
        var maxXPos = window.innerWidth - bild.width - 50;
        var maxYPos = window.innerHeight - bild.height - 50;
        
        // Zufällige Schrittweite zwischen 300 und 1200 Pixel
        var schrittweiteX = Math.random() * 900 + 300;
        var schrittweiteY = Math.random() * 900 + 300;
        
        // Zufällige x- und y-Komponenten für die Bewegung
        var deltaX = (Math.random() < 0.5 ? -1 : 1) * schrittweiteX;
        var deltaY = (Math.random() < 0.5 ? -1 : 1) * schrittweiteY;
        
        // Neue Position berechnen
        var neueXPos = aktuelleXPos + deltaX;
        var neueYPos = aktuelleYPos + deltaY;

        // Wenn die neue Position nahe der aktuellen Position ist, Schrittweite vergrößern
        while (Math.abs(neueXPos - aktuelleXPos) < 100 || Math.abs(neueYPos - aktuelleYPos) < 100) {
            deltaX = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 900 + 300);
            deltaY = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 900 + 300);
            neueXPos = aktuelleXPos + deltaX;
            neueYPos = aktuelleYPos + deltaY;
        }
        
        // Begrenze die Position, damit das Bild im sichtbaren Bereich bleibt
        neueXPos = Math.max(50, Math.min(maxXPos, neueXPos));
        neueYPos = Math.max(50, Math.min(maxYPos, neueYPos));
        
        // Aktualisiere die Position des Bildes
        bild.style.left = neueXPos + "px";
        bild.style.top = neueYPos + "px";
        
        // Speichere die aktuelle Position
        aktuelleXPos = neueXPos;
        aktuelleYPos = neueYPos;
    }, 500); // Bewegungsgeschwindigkeit (in Millisekunden)
}