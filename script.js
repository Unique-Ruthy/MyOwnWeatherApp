const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "cd1083e4bf6533d3862f369998e056df";

<li class="card">
  <h3>(2023-04-30)</h3>
  <img src="https://openweathermap.org/img/wn/10d@4x.png" alt="" />
  <h4>Temperature: 19.10 C</h4>
  <h4>Wind: 4.31 M/S</h4>
  <h4>Humidity</h4>
</li>;
const createWeatherCard = (weatherItem) => {
  return ``;
};

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const uniqueForecastDays = [];
      //   console.log(data);

      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecast)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      console.log(fiveDaysForecast);
      fiveDaysForecast.forEach((weatherItem) => {
        createWeatherCard(weatherItem);
      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast");
    });
};

const getCityCoordinates = () => {
  const cityName = cityInput.value.trim(); //get user entered city and remove extra spaces
  if (!cityName) return; //return if cityName is empty
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching the coordinates!");
    });
};

searchButton.addEventListener("click", getCityCoordinates);
