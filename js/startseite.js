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