let sunriseElement;
let sunsetElement;
let locationElement;
let timeLeftElement;
let sunElement;
let totalTime = new Date();

//place sun on left and bottom position
//based on the total time and current time

const placeSun = (sunrise) => {
  const now = new Date();
  const sunriseDate = new Date(sunrise * 1000);
  const percentage = ((now - sunriseDate) / totalTime) * 100;

  console.log(new Date(sunriseDate - now));

  const sunLeftPosition = percentage;
  const sunBottomPosition = percentage > 50 ? 100 - percentage : percentage * 2;

  sunElement.style.left = `${sunLeftPosition}%`;
  sunElement.style.bottom = `${sunBottomPosition}%`;
};

const updateTimeAndTimeLeft = (timeLeftTimeStamp) => {
  sunElement.dataset.time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  timeLeftElement.innertext = timeLeftTimeStamp;
};

const setDOMElemets = () => {
  sunriseElement = document.querySelector('.js-sunrise');
  sunsetElement = document.querySelector('.js-sunset');
  locationElement = document.querySelector('.js-location');
  sunElement = document.querySelector('.js-sun');
  timeLeftElement = document.querySelector('.js-time-left');

  if (!sunriseElement || !sunsetElement || !locationElement || !sunElement || !timeLeftElement) {
    throw new Error('DOM elements not found!');
  }
};

const makeReadableTimeFormatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const setLocationData = (data) => {
  sunriseElement.innertext = makeReadableTimeFormatTimestamp(data.sunrise);
  sunsetElement.innertext = makeReadableTimeFormatTimestamp(data.sunset);
  locationElement.innertext = `${data.name}, ${data.country}`;
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

document.addEventListener('DOMContentLoaded', async function () {
  let lat = 50.8027841;
  let long = 3.2097454;
  const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=dec3206e837ac4f792e9a7183c03f432&units=metric&lang=nl&cnt=1`;

  setDOMElemets();

  const { city } = await getData(endpoint);
  setLocationData(city);
  totalTime =
    new Date(city.sunset * 1000 - city.sunrise * 1000).getHours() * 60 +
    new Date(city.sunset * 1000 - city.sunrise * 1000).getMinutes();

  updateTimeAndTimeLeft('TODO');
  placeSun(city.sunrise);
});
