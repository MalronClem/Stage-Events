 // Sélection des éléments <li> dans la navigation
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


 document.addEventListener("DOMContentLoaded", function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');

    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const intervalTime = 3000; // Temps en millisecondes entre chaque diapositive (3 secondes dans cet exemple)
    let slideInterval;

    function startSlide() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function updateCarousel() {
        const itemWidth = carouselItems[0].clientWidth;
        carouselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // Démarrer le carousel automatique
    startSlide();
});
