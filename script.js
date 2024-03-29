//Display all elements of the city searched.
function displayElements(response) {
  //City
  let cityElement = document.querySelector("#searchCity");
  cityElement.innerHTML = response.data.city;

  //Temperature
  let tempElement = document.querySelector("#current");
  let temperature = Math.round(response.data.temperature.current);
  tempElement.innerHTML = `${temperature}°`;

  //Humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity:${response.data.temperature.humidity}%`;

  //Weather description
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `Weather condition:${response.data.condition.description}`;

  //Wind Speed
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind:${response.data.wind.speed}mph`;

  //Time
  let timeElement = document.querySelector("h3");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  //icon
  let iconElement = document.querySelector("#currentImg");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;

  getForecast(response.data.city);
}
//Date formula
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day},${hours}:${minutes}`;
}

//The api address.
function searchCity(city) {
  let apiKey = "6dc2ff988bo9e47td8b8fab65e339a00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=6dc2ff988bo9e47td8b8fab65e339a00&units=imperial`;

  axios.get(apiUrl).then(displayElements);
}
//What makes what is types in the search box appear in the "h2".
function searchBox(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  //im calling in the searchCity function here so that what is typed in the search box is actually registered in the api.
  searchCity(searchInput.value);
}
//calling forth the searchBox function.
let findCity = document.querySelector("#search-box");
findCity.addEventListener("submit", searchBox);

searchCity("New york");

function getForecast(city) {
  let apiKey = "6dc2ff988bo9e47td8b8fab65e339a00";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}
//The forecast function

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //It kept showing the current day this is how I was able to start the forecast on the next day.
  return days[(date.getDay() + 1) % 7];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
<div class="weather-forecast-day">      
  <div class="weather-forecast-date">${formatDay(day.time)}</div>   
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}" />
    </div>    
      <div class="weather-forecast-temps">         
        <span class="weather-forecast-temp-high">${Math.round(
          day.temperature.maximum
        )}°F</span>   
         <span class="weather-forecast-temp-low">${Math.round(
           day.temperature.minimum
         )}°F</span>      
      </div>     
 </div>
  `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
