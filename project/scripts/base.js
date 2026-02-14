const navButton = document.getElementById('menu');
const navHolder = document.querySelector('.navigation');

if (navButton) {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('active');
        navHolder.classList.toggle('active');
    });
}

document.getElementById('currentyear').innerHTML = new Date().getFullYear();