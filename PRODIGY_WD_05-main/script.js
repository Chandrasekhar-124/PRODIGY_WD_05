document.getElementById('fetchWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function getWeatherData(location) {
    const apiKey = 'd569a206d9c13e27ab2ffa6012ef7c16'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const body = document.body;
    const { name, main, weather } = data;

    let weatherClass;
    let iconClass;
    const weatherCondition = weather[0].main.toLowerCase();

    switch (weatherCondition) {
        case 'clear':
            weatherClass = 'sunny';
            iconClass = 'wi-day-sunny';
            break;
        case 'clouds':
            weatherClass = 'cloudy';
            iconClass = 'wi-cloudy';
            break;
        case 'rain':
            weatherClass = 'rainy';
            iconClass = 'wi-rain';
            break;
        case 'snow':
            weatherClass = 'snowy';
            iconClass = 'wi-snow';
            break;
        default:
            weatherClass = 'default';
            iconClass = 'wi-na';
    }

    body.className = weatherClass;
    weatherIcon.className = `wi ${iconClass}`;

    weatherInfoDiv.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}
