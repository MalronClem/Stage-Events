gsap.delayedCall(0, function() {
    document.querySelectorAll('.container').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.1, filter: 'grayscale(100%)', duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, filter: 'none', duration: 0.3 });
        });
    });
});
