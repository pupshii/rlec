let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.top = '-60px'; // Adjust to hide header
    } 
    else {
        // Scrolling up
        header.style.top = '0';
    }
    lastScrollTop = scrollTop;
});