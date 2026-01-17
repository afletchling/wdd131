const navButton = document.getElementById('menu');
const navHolder = document.querySelector('.navigation');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('active');
    navHolder.classList.toggle('active');
});