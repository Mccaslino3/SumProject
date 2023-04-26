const apiKey = '7db774a680eab3e5ca365d3d5952a97e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


const alertLocationInput = document.querySelector('.alert-location-input');
const alertSearchButton = document.querySelector('.alert-search-button');
const alertResults = document.querySelector('.alert-results');

function displayAlertData(data) {
    alertResults.innerHTML = '';

    if (data.alerts && data.alerts.length) {
        data.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.classList.add('alert-item');
            alertElement.innerHTML = `
                <h3>${alert.event}</h3>
                <p>Start: ${new Date(alert.start * 1000).toLocaleString()}</p>
                <p>End: ${new Date(alert.end * 1000).toLocaleString()}</p>
                <p>Description: ${alert.description}</p>
            `;
            alertResults.appendChild(alertElement);
        });
    } else {
        alertResults.innerHTML = '<p>No weather alerts for the selected location.</p>';
    }
}


async function searchAlerts() {
    const query = alertLocationInput.value.trim();

    if (query) {
        const coordinates = await fetchCoordinates(query);
        if (coordinates) {
            fetchAlertData(coordinates.lat, coordinates.lon);
        } else {
            alert('Please enter a valid city or ZIP code.');
        }
    } else {
        alert('Please enter a valid city or ZIP code.');
    }
}

alertSearchButton.addEventListener('click', searchAlerts);
