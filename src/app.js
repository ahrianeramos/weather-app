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
  location.innerHTML = response.data.name;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  tempIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  temperature.innerHTML = Math.round(response.data.main.temp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "d181817faaf7ac4148d91ac2cdf0c65a";
let city = "Rome"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
