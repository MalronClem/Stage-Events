document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentSlideIndex = 0;

    // Position all the slides next to each other
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    // Function to move to the next slide using GSAP
    function moveToNextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slideCount;
        gsap.to(track, { x: `-${currentSlideIndex * 100}%`, duration: 1, ease: "power2.inOut" });
    }

    // Set interval to move to the next slide automatically
    setInterval(moveToNextSlide, 2000); // Change slide every 2 seconds
});
