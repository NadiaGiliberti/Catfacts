
// Burgermenu aktion
document.querySelector('.burger').addEventListener('click', function() {
    const burgermenu = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    
    menu.classList.toggle('active');
    
    // Ändere das Burgermenü-Symbol zu einem Kreuzsymbol und umgekehrt
    burgermenu.classList.toggle('open');
});


