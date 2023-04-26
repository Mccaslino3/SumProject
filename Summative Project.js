const apiKey = '7db774a680eab3e5ca365d3d5952a97e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.querySelector('.location-input');
const searchButton = document.querySelector('.search-button');
const cityElement = document.querySelector('.city');
const countryElement = document.querySelector('.country');
const tempValueElement = document.querySelector('.temp-value');
const tempUnitElement = document.querySelector('.temp-unit');
const weatherDescriptionElement = document.querySelector('.weather-description');
const errorMessageElement = document.querySelector('.error-message');

function displayWeatherData(data) {
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    tempValueElement.textContent = Math.round(data.main.temp);
    weatherDescriptionElement.textContent = data.weather[0].description;

    errorMessageElement.textContent = '';
}

function showError(message) {
    errorMessageElement.textContent = message;
}

async function fetchWeatherData(query) {
    try {
        const response = await fetch(`${apiUrl}?q=${query}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeatherData(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Failed to fetch weather data. Please try again later.');
    }
}

function searchLocation() {
    const query = locationInput.value.trim();

    if (query) {
        fetchWeatherData(query);
    } else {
        showError('Please enter a valid city or ZIP code.');
    }
}

searchButton.addEventListener('click', searchLocation);

locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchLocation();
    }
});