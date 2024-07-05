const navItems = document.querySelectorAll('nav ul li');
// Ajout d'un écouteur de clic à chaque <li>
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Récupérer la valeur de data-content
        const content = this.getAttribute('data-content');

        // Cacher tous les divs du <main>
        document.querySelectorAll('main > div').forEach(div => {
            div.style.display = 'none';
        });

        // Afficher le div correspondant à data-content
        const divToShow = document.getElementById(content);
        if (divToShow) {
            divToShow.style.display = 'flex';
        }
    });
});