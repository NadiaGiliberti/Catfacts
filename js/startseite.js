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
        
        window.location.href = event.target.parentElement.href;
    }
}

// Füge den Eventlistener nur dem Element mit der ID "mouse" hinzu, nachdem das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    // Aktualisiere die Anzeige der Hoveranzahl, wenn das DOM geladen ist
    updateHoverCount();
    // Füge den Eventlistener hinzu
    document.getElementById("mouse").addEventListener("mouseover", handleMouseHover);
});



