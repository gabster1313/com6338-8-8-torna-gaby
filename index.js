var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';

var weatherAppDiv = document.getElementById('weather-app');
var form = document.querySelector('form');
var input = document.getElementById('weather-search');
const weatherDisplay = document.getElementById('weather');

form.onsubmit = function(e) {
    e.preventDefault();

    var userQuery = input.value.trim();
        console.log("User input:" + " " + userQuery);
    
    var queryString = '?units=imperial&appid=731656e2316f6224d48e82770fabc3c5&q=' + userQuery;
    var fetchURL = weatherURL + queryString;
    
    fetch(fetchURL)
        .then(function(response) {
            console.log("Response Status:" + " " + response.status);
            
            if (response.status === 404) { 
                showLocationNotFound();
                input.value = ''; 
                return;
            }  
      
            return response.json(); 
        })
        .then(function(data) {
            if (data) {
                console.log(data);
                updateDisplay(data);
                input.value = '';
            }
        });
}

function showLocationNotFound() {
    var h2 = document.createElement('h2');
    h2.textContent = 'Location not found';
    weatherDisplay.innerHTML = '';
    weatherDisplay.appendChild(h2);
}
     
function updateDisplay(data) {
    weatherDisplay.innerHTML = '';

    var city = data.name;
    var country = data.sys.country;
    var mapLink = "https://www.google.com/maps/search/?api=1&query=" + data.coord.lat + "," + data.coord.lon;
    var weatherIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'; 
    var weatherDescription = data.weather[0].description;
    var currentTemp = data.main.temp;
    var feelsLike = data.main.feels_like;
    
    var dataTime = data.dt * 1000;
    var date = new Date(dataTime);  
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    console.log("City:" + " " + city);
    console.log("Country:" + " " + country);
    console.log("Map link:" + " " + mapLink);
    console.log("Icon link:" + " " + weatherIcon);
    console.log("Description:" + " " + weatherDescription);
    console.log("Temp:" + " " + currentTemp);
    console.log("Feels like temp:" + " " + feelsLike);
    console.log("dt:" + " " + dataTime);
    console.log("Last updated:" + " " + timeString);


    var locationDisplay = document.createElement('h2');
    locationDisplay.textContent = city + ', ' + country;
    weatherDisplay.appendChild(locationDisplay);

    var mapLinkDisplay = document.createElement('a');
    mapLinkDisplay.href = mapLink;
    mapLinkDisplay.target = "_blank";
    mapLinkDisplay.textContent = "Click to view map";
    weatherDisplay.appendChild(mapLinkDisplay);

    var weatherIconDisplay = document.createElement('img');
    weatherIconDisplay.src = weatherIcon;
    weatherIconDisplay.innerText = 'Click to view map';
    weatherDisplay.appendChild(weatherIconDisplay);

    var breakElement = document.createElement('br');
    var weatherDescriptionDisplay = document.createElement('p');
    weatherDescriptionDisplay.textContent = weatherDescription;
    weatherDisplay.appendChild(weatherDescriptionDisplay);
    weatherDisplay.appendChild(breakElement);

    var currentTempDisplay = document.createElement('p');
    currentTempDisplay.textContent = 'Current: ' + currentTemp + '°F';
    weatherDisplay.appendChild(currentTempDisplay);

    var breakElement = document.createElement('br');
    var feelsLikeDisplay = document.createElement('p');
    feelsLikeDisplay.textContent = 'Feels like: ' + feelsLike + '°F';
    weatherDisplay.appendChild(feelsLikeDisplay);
    weatherDisplay.appendChild(breakElement);

    var lastUpdatedDisplay = document.createElement('p');
    lastUpdatedDisplay.textContent = 'Last updated: ' + timeString;
    weatherDisplay.appendChild(lastUpdatedDisplay);
}
  