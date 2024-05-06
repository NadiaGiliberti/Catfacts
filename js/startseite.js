function openPopup(popup) {
    var popup = document.getElementById("popup");
}

function closePopup(popup) {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

//Pop up Fact beim Hover über Mausbild
function openPopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "flex";
}

function closePopup_fact(popup_fact) {
    var popup_fact = document.getElementById("popup_fact");
    popup_fact.style.display = "none";
}

// Füge einen Event-Listener zum Bild "mouse" hinzu
document.getElementById("mouse").addEventListener("mouseover", function() {
    openPopup_fact("popup_fact"); // Das Popup wird nur beim Hover über das Bild "mouse" angezeigt
});

document.getElementById("more_mice").addEventListener("click", function() {
    closePopup_fact("popup_fact");
});





// Fenstergröße erheben
let mouseXprevious = [0];
let mouseYprevious = [0];

// Katze an Cursor
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

    if (hoverCount > 0) {
        // Wenn der Hoverzähler 0 ist, zeige das Popup an
        document.getElementById("popup_fact").style.display = "flex";
    } else {
        // Andernfalls, verstecke das Popup
        document.getElementById("popup_fact").style.display = "none";
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
});



