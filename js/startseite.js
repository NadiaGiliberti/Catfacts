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

    cat.style.left = posX + 'px';
    cat.style.top = posY + 'px';
    console.log("maus wurde bewegt:", posX, posY);

})

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





