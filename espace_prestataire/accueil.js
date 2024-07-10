/****************************************************************************************/
//gestion de la nav et du changement de page

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






/****************************************************************************************/
//gestion de la page aide

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



/****************************************************************************************/
//gestion de la page prestations


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
//gestion de la page accueil


const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let autoScrollInterval;

function showSlide(index) {
    if (index >= carouselItems.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = carouselItems.length - 1;
    } else {
        currentIndex = index;
    }
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}
function nextSlide() {
    showSlide(currentIndex + 1);
}
function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 4000); 
}
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}
nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoScroll();
    startAutoScroll();
});
prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    stopAutoScroll();
    startAutoScroll();
});
startAutoScroll(); 


