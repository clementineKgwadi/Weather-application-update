function updateWeather(response) {
  let cityElement = document.querySelector("#city");
  let currentTempElement = document.querySelector(
    "#weather-temperature-current"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherFeelsLikeElement = document.querySelector("#weather-feels");
  let weekDaysElement = document.querySelector("#week-days");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");

  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  weatherFeelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°`;
  weekDaysElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = `${response.data.condition.description} conditions`;
  iconElement.innerHTML = `<img
                  src="${response.data.condition.icon_url}" class="weather-temperature-icon" />`;
}
function formatDate(date) {
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
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, <strong>${hours}:${minutes}</strong>`;
}

function displayCity(event) {
  event.preventDefault();
  let searchFormInputElement = document.querySelector("#search-form-input");
  showCity(searchFormInputElement.value);
}

function showCity(city) {
  let apiKey = "fe5e09ad6aaeb38c2a11t3o0f7b7a744";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function forecast() {
  let weekDays = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  weekDays.forEach(function (day) {
    forecastHtml += `
   <div class="weather-forecast-content">
            <div class="weather-forecast-day">${day}</div>
            <div class="weather-forecast-icon">⛈️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temp"><strong>25°</strong></div>
              <div class="weather-forecast-temp"><strong>11°</strong></div>
            </div>
          </div>
  `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", displayCity);

showCity("Cape Town");
forecast();
