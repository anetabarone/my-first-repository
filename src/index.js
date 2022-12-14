let actualDate = document.querySelector("h2");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
actualDate.innerHTML =
  days[now.getDay()] +
  ", " +
  months[now.getMonth()] +
  " " +
  now.getDate() +
  ", " +
  now.getFullYear();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="42"
  />
   <div class="weather-forecast-temperatures">
     <span class="weather-forecast-temperature-max"> ${Math.round(
       forecastDay.temp.max
     )}° </span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temp.min
      )}° </span>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#actualTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humiditySpan").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windSpan").innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

function showMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actualTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#actualTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#city-search-bar");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLoc");
currentLocationButton.addEventListener("click", showMyLocation);

searchCity("Amsterdam");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
