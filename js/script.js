const catFactsApp = document.querySelector('#catFactsApp');

// POP UP:
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