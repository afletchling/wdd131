function addTableData(selector, key, value) {
    let table = document.body.querySelector(selector);
    table = table ? table.querySelector('tbody') : undefined;

    if (table) {
        const tableRegion = document.createElement('tr');
        const keyElement = document.createElement('td');
        const valueElement = document.createElement('td');

        keyElement.textContent = key;
        valueElement.textContent = value;
        tableRegion.appendChild(keyElement);
        tableRegion.appendChild(valueElement);

        table.appendChild(tableRegion);
    }
}

function calculateWindChill(temperature, windSpeed) {
    const windChill = 13.12 + 0.6215 * temperature - 11.37 * (windSpeed ** 0.16) + 0.3965 * temperature * (windSpeed ** 0.16);
    return `${Math.round(windChill * 10) / 10}C`;
}

const temperature = -19;
const windSpeed = 10;
const countryData = {
    data: {
        Area: '9,984,670 sq km',
        Population: '41,575,585',
        Capital: 'Ottawa',
        Languages: 'English, French',
        Currency: 'Canadian dollar',
        'Time Zone': 'UTC-3.5 to -8',
        'Calling Code': '+1',
        'Internet TLD': '.ca'
    },
    weather: {
        Temperature: `${temperature}C`,
        Conditions: 'Partly Cloudy',
        Wind: `${windSpeed} km/h`,
        'Wind Chill': (temperature <= 10 || windSpeed > 4.8) ? calculateWindChill(temperature, windSpeed) : 'N/A'
    }
};

for (const [selector, dataStore] of Object.entries(countryData)) {
    for (const data of Object.entries(dataStore)) {
        addTableData(`#${selector}`, ...data);
    }
}

