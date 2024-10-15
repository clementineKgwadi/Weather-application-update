function updateWeather(response) {
  let cityElement = document.querySelector("#city");
  let currentTempElement = document.querySelector(
    "#weather-temperature-current"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherFeelsLikeElement = document.querySelector("#weather-feels");
  let weekDaysElement = document.querySelector("#week-days");
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
  iconElement.innerHTML = `<img
                  src="${response.data.condition.icon_url}" class="weather-temperature-icon" />`;
  getFullForecast(response.data.city);
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

function getFullForecast(city) {
  let apiKey = "fe5e09ad6aaeb38c2a11t3o0f7b7a744";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function forecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml += `
   <div class="weather-forecast-content">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <div>
            <img src = "${
              day.condition.icon_url
            }" class = "weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.maximum
              )}°</div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
  `;
    }

    let temperatureConditionElement = document.querySelector(
      "#temperature-conditions"
    );
    let conditionElement = document.querySelector("#condition");

    let minimumTemp = Math.round(day.temperature.minimum);
    let maximumTemp = Math.round(day.temperature.maximum);

    temperatureConditionElement.innerHTML = `${maximumTemp}° / ${minimumTemp}°`;

    conditionElement.innerHTML = `${
      day.condition.description
    }. highs ${Math.round(day.temperature.maximum)}° & lows ${Math.round(
      day.temperature.minimum
    )}°`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", displayCity);

showCity("Cape Town");
