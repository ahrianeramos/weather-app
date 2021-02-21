function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let location = document.querySelector("#location");
  let currentDate = document.querySelector("#current-date");
  let description = document.querySelector("#description");
  let tempIcon = document.querySelector("#temp-icon");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  celsiusTemp = response.data.main.temp;

  location.innerHTML = response.data.name;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  tempIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  temperature.innerHTML = Math.round(celsiusTemp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = "d181817faaf7ac4148d91ac2cdf0c65a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemp);
}

search("San Francisco");

let form = document.querySelector("#search-engine");
form.addEventListener("submit", formSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);