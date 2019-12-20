"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';

    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Pls enter city name');
    }
    var http = new XMLHttpRequest();
    //var apiKey = 'afcff035b172156e2773b5ffb19a91f9';
    var apiKey = config.API_KEY;
    var apiUrl = config.API_URL;
    var url = apiUrl + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200){
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            
            updateWeather(weatherData);
        } else if (http.readyState == XMLHttpRequest.DONE) {
            alert('something went wrongs !');
        }
    };

    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}