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

function displayWeatherCondition(response) {
  document.querySelector("#searchedCity").innerHTML = response.data.name;
  document.querySelector("#actualTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
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

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLoc");
currentLocationButton.addEventListener("click", showMyLocation);

searchCity("Amsterdam");
