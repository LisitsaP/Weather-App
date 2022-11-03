const apiGeoLocation = {
  endpoint: "https://ipgeolocation.abstractapi.com/v1/",
  key: "86ae261a3ef34d888bd3050ebfdefe1d",
};

const input = document.querySelector("#input");
input.addEventListener("keydown", enter);

function enter(e) {
  if (e.keyCode === 13) {
    getInfo(input.value);
  }
}

async function getGeoLocation() {
  const resGeoLocation = await fetch(
    `${apiGeoLocation.endpoint}?api_key=${apiGeoLocation.key}`
  );
  const resultGeoLocation = await resGeoLocation.json();
  console.log(resultGeoLocation);
  getInfo(resultGeoLocation.city);
}

getGeoLocation();

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "2dc20c4b6b46af31fa8ed22dcc8b33e3",
};

function enter(e) {
  if (e.keyCode === 13) {
    getInfo(input.value);
  }
}

async function getInfo(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  const result = await res.json();
  displayResult(result);
}
function displayResult(result) {
  let city = document.querySelector("#city");
  city.textContent = `${result.name}, ${result.sys.country}`;

  getOurDate();

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML =
    "Feels like " + `${Math.round(result.main.feels_like)}<span>°</span>`;
  let conditions = document.querySelector("#conditions");
  conditions.textContent = `${result.weather[0].main}`;

  weatherBakground(result);

  let variation = document.querySelector("#variation");
  variation.innerHTML =
    "Min: " +
    `${Math.round(result.main.temp_min)}<span>°</span>` +
    " Max: " +
    `${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurDate() {
  const myDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  let day = days[myDate.getDay()];
  let todatDate = myDate.getDay();

  let month = months[myDate.getMonth()];

  let year = myDate.getFullYear();

  let fullDate = document.querySelector("#date");
  fullDate.textContent =
    `${day}` + " " + `${todatDate}` + " " + `${month}` + " " + `${year}`;
}

function weatherBakground(result) {
  let condition = `${result.weather[0].main}`;

  if (condition === "Clear") {
    document.body.style.backgroundImage = "url('sun.jpg')";
  }

  if (condition === "Clouds") {
    document.body.style.backgroundImage = "url('Clouds.jpg')";
  }

  if (
    condition === "Mist" ||
    condition === "Smoke" ||
    condition === "Haze" ||
    condition === "Fog"
  ) {
    document.body.style.backgroundImage = "url('haze.jpg')";
  }

  if (condition === "Dust" || condition === "Ash" || condition === "Sand") {
    document.body.style.backgroundImage = "url('sand.jpg')";
  }

  if (condition === "Squall" || condition === "Tornado") {
    document.body.style.backgroundImage = "url('wind.jpg')";
  }

  if (condition === "Snow") {
    document.body.style.backgroundImage = "url('snow.jpg')";
  }

  if (condition === "Rain" || condition === "Drizzle") {
    document.body.style.backgroundImage = "url('rain.jpg')";
  }

  if (condition === "Thunderstorm") {
    document.body.style.backgroundImage = "url('storm.jpg')";
  }
}

gsap.from("#container", { opacity: 0, y: -10, duration: 1, delay: 1q});