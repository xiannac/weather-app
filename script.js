//To make the Date appear.
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${month} ${date} ,${hours}:${minutes}`;

//Display temperature.
//
function displayTemp(response) {
  let tempElement = document.querySelector("#current");
  let cityElement = document.querySelector("#searchCity");

  cityElement.innerHTML = response.data.city;

  let temperature = Math.round(response.data.temperature.current);
  tempElement.innerHTML = `${temperature}°`;
}

//The api address.
function searchCity(city) {
  let apiKey = "6dc2ff988bo9e47td8b8fab65e339a00";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=6dc2ff988bo9e47td8b8fab65e339a00&units=imperial`;

  axios.get(apiUrl).then(displayTemp);
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
