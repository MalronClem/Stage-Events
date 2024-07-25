/****************************************************************************************/
//gestion de la nav et du changement de page

document.addEventListener('DOMContentLoaded', function() {
    // Mettre en pause et cacher toutes les vidéos au chargement
    document.querySelectorAll('main video').forEach(video => {
        video.pause();
        video.currentTime = 0; // Réinitialiser la vidéo au début
        video.style.display = 'none';
    });

    // Ajouter des écouteurs de clic à chaque <li>
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer la valeur de data-content
            const content = this.getAttribute('data-content');

            // Cacher tous les divs du <main>
            document.querySelectorAll('main > div').forEach(div => {
                div.style.display = 'none';
            });

            // Mettre en pause et cacher toutes les vidéos
            document.querySelectorAll('main video').forEach(video => {
                video.pause();
                video.currentTime = 0; // Réinitialiser la vidéo au début
                video.style.display = 'none';
            });

            // Afficher le div correspondant à data-content
            const divToShow = document.getElementById(content);
            if (divToShow) {
                divToShow.style.display = 'flex';
                const videoToPlay = divToShow.querySelector('video');
                if (videoToPlay) {
                    videoToPlay.style.display = 'block';
                    videoToPlay.play();
                }
            }
        });
    });
});

/****************************************************************************************/
//gestion de la page faq

function filterContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const helpItems = document.querySelectorAll('.help-item');

    helpItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
} 

