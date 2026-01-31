const navButton = document.getElementById('menu');
const navHolder = document.querySelector('.navigation');
const templeHolder = document.getElementById('temples');
const templeObjects = [];

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Chicago Illinois",
        location: "Glenview, Illinois",
        dedicated: "1983, August, 13",
        area: 37062,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/chicago-illinois/400x250/Chicago-Temple-Main_4214.jpg"
    },
    {
        templeName: "Columbus Ohio",
        location: "Columbus, Ohio, United States",
        dedicated: "1998, September, 12",
        area: 11745,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/columbus-ohio/400x250/columbus-temple-lds-406110-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Medford Oregon",
        location: "Central Point, Oregon, United States",
        dedicated: "1999, May, 20",
        area: 10700,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/medford-oregon/400x250/medford-oregon-temple-lds-935796-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
];

const filters = {
    home: () => { return true; },
    old: (entry) => {
        const year = Number.parseInt(entry.temple.dedicated.split(',')[0]);
        return year < 1900;
    },
    new: (entry) => {
        const year = Number.parseInt(entry.temple.dedicated.split(',')[0]);
        return year > 2000;
    },
    large: (entry) => { return entry.temple.area > 90000; },
    small: (entry) => { return entry.temple.area < 10000; }
};

function createTemples() {
    for (const temple of temples) {
        const entry = document.createElement('figure');
        const title = document.createElement('figcaption');
        const content = document.createElement('p');
        const image = document.createElement('img');
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = 'lazy';
        title.textContent = temple.templeName;
        content.innerHTML = `Location: ${temple.location}<br>Dedicated: ${temple.dedicated}<br>Size: ${temple.area} sq ft`;

        entry.appendChild(title);
        entry.appendChild(content);
        entry.appendChild(image);
        templeHolder.appendChild(entry);

        templeObjects.push({
            temple,
            element: entry
        });
    }
}

function setupFilters() {
    for (const [filter, callback] of Object.entries(filters)) {
        const nav = document.getElementById(`${filter}-nav`);

        if (nav) {
            nav.addEventListener('click', () => {
                for (const holder of templeObjects) {
                    holder.element.classList.add('hidden');
                }

                const filteredTemples = templeObjects.filter(callback);
                for (const holder of filteredTemples) {
                    holder.element.classList.remove('hidden');
                }
            });
        }
    }
}

if (templeHolder) {
    createTemples();
    setupFilters();
}

if (navButton) {
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('active');
        navHolder.classList.toggle('active');
    });
}