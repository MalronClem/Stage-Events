document.addEventListener('scroll', function() {
    const listItems = document.querySelectorAll('.data li');
    listItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const inView = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if (inView) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});