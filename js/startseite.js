// POP UP beim Laden der Seite:
document.addEventListener("DOMContentLoaded", function () {
    openPopup();  // Zeige das Popup an, wenn die Seite geladen ist
});

function openPopup() {
    var popup = document.getElementById("popup");
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}


// Katze an Cursor
let cat = document.querySelector('#cat');
document.addEventListener('mousemove', function(e) {
    let posX = e.clientX;
    let posY = e.clientY;

    // Position des Mittelpunkts des Bildes
    let catRect = cat.getBoundingClientRect();
    let centerX = catRect.left + catRect.width / 2;
    let centerY = catRect.top + catRect.height / 2;

    // Position der Maus relativ zum Mittelpunkt des Bildes berechnen
    let mouseX = posX - centerX;
    let mouseY = posY - centerY;

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
});

// Initialisieren der Klickanzahl im sessionStorage, falls noch nicht vorhanden
if (!sessionStorage.getItem('clickCount')) {
    sessionStorage.setItem('clickCount', '0');
}

// Laden der aktuellen Klickanzahl
var clickCount = parseInt(sessionStorage.getItem('clickCount'));

// Funktion zur Aktualisierung der Klickanzahl-Anzeige
function updateClickCount() {
    // Laden der aktuellen Klickanzahl
    clickCount = parseInt(sessionStorage.getItem('clickCount'));
    // Aktualisieren der Anzeige der Klickanzahl auf dem Bildschirm
    document.getElementById("clickNumber").textContent = clickCount;
   if (clickCount == 0) {
        // Wenn der Klickzähler 0 ist, zeige das Popup an
   document.getElementById("popup").style.display = "flex";
  } else {
        // Andernfalls, verstecke das Popup
     document.getElementById("popup").style.display = "none";
   }
}

function handleMouseClick(event) {
    // Überprüfen, ob das geklickte Element die ID "mouse" hat
    if (event.target.id === "mouse") {
        // Inkrementiere die Klickanzahl
        clickCount++;
        // Speichere die aktualisierte Klickanzahl im SessionStorage
        sessionStorage.setItem("clickCount", clickCount.toString());
        console.log("Erfolgreicher Klick! Gesamtanzahl: " + clickCount);

        // Aktualisiere die Anzeige der Klickanzahl auf dem Bildschirm
        updateClickCount();
    }
}

// Füge den Eventlistener nur dem Element mit der ID "mouse" hinzu, nachdem das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    // Aktualisiere die Anzeige der Klickanzahl, wenn das DOM geladen ist
    updateClickCount();
    // Füge den Eventlistener hinzu
    document.getElementById("mouse").addEventListener("click", handleMouseClick);
});





