/****************************************************************************************/
// Gestion de la navigation et du changement de page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre en pause et cacher toutes les vidéos au chargement
    document.querySelectorAll('main video').forEach(video => {
        video.pause();
        video.currentTime = 0; // Réinitialiser la vidéo au début
        video.style.display = 'none';
    });

    // Ajouter des écouteurs de clic à chaque <li> de navigation
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
// Gestion de la page d'aide

function filterContent() {
    // Récupérer la valeur de la recherche et la convertir en minuscules
    const input = document.getElementById('searchInput').value.toLowerCase();
    const helpItems = document.querySelectorAll('.help-item');

    helpItems.forEach(item => {
        // Récupérer les mots-clés de chaque élément et les convertir en minuscules
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        // Afficher ou cacher l'élément en fonction de la recherche
        if (keywords.includes(input)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/****************************************************************************************/
// Gestion de la page des prestations

function updateContent() {
    // Récupérer les valeurs des inputs
    const companyName = document.getElementById('companyNameInput').value;
    const companyDescription = document.getElementById('companyDescriptionInput').value;
    const coordonneesInput = document.getElementById('coordonneesInput').value;
    const photos = document.getElementById('photosInput').value.split(',');

    // Mettre à jour les éléments de la page
    document.getElementById('companyName').textContent = companyName;
    document.getElementById('companyDescription').textContent = companyDescription;
    document.getElementById('coordonnees').textContent = coordonneesInput;

    // Mettre à jour les photos
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = '';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.trim();
        img.alt = 'Photo';
        photosContainer.appendChild(img);
    });
}

/****************************************************************************************/
// Gestion de la page d'accueil
const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let autoScrollInterval;

// Vérifiez que tous les éléments nécessaires existent
if (prevButton && nextButton && carouselInner && carouselItems.length > 0) {

    // Fonction pour afficher le slide correspondant à l'index donné
    function showSlide(index) {
        if (index >= carouselItems.length) {
            currentIndex = 0; // Revenir au premier slide si l'index est trop élevé
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1; // Revenir au dernier slide si l'index est trop bas
        } else {
            currentIndex = index;
        }
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Fonction pour aller au slide suivant
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Fonction pour démarrer le défilement automatique
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 4000);
    }

    // Fonction pour arrêter le défilement automatique
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Ajouter des écouteurs d'événements pour les boutons de navigation
    nextButton.addEventListener('click', () => {
        stopAutoScroll(); // Arrêtez d'abord le défilement automatique
        nextSlide(); // Affichez le slide suivant
        startAutoScroll(); // Redémarrez le défilement automatique
    });

    prevButton.addEventListener('click', () => {
        stopAutoScroll(); // Arrêtez d'abord le défilement automatique
        showSlide(currentIndex - 1); // Affichez le slide précédent
        startAutoScroll(); // Redémarrez le défilement automatique
    });

    // Démarrer le défilement automatique au chargement de la page
    startAutoScroll();
} else {
    console.error('Un ou plusieurs éléments nécessaires pour le carousel sont manquants.');
}






// Gestion du carrousel de cartes
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const prevButton2 = document.querySelector('.prev');
    const nextButton2 = document.querySelector('.next');
    const cardWidth = cards[0].getBoundingClientRect().width;
    const cardsToShow = 3; // Nombre de cartes affichées simultanément
    const totalCards = cards.length;
    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;

    let currentIndex2 = 0;

    function moveToSlide(index) {
        const amountToMove = -index * cardWidth * cardsToShow;
        track.style.transform = `translateX(${amountToMove}px)`;
        console.log(`Déplacement du carrousel à l'index ${index}, transformation: ${track.style.transform}`);
    }

    nextButton2.addEventListener('click', () => {
        console.log('Bouton "suivant" cliqué.');
        if (currentIndex2 < maxIndex) {
            currentIndex2++;
            moveToSlide(currentIndex2);
        } else {
            console.log('Impossible d\'avancer, dernière carte atteinte.');
        }
    });

    prevButton2.addEventListener('click', () => {
        console.log('Bouton "précédent" cliqué.');
        if (currentIndex2 > 0) {
            currentIndex2--;
            moveToSlide(currentIndex2);
        } else {
            console.log('Impossible de reculer, première carte atteinte.');
        }
    });
});



// Initialiser les attributs data-text pour les titres des cartes
document.addEventListener("DOMContentLoaded", function() {
    var headings = document.querySelectorAll(".card h3");
    headings.forEach(function(heading) {
        heading.setAttribute("data-text", heading.textContent);
    });
});
