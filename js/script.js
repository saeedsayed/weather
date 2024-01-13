let mainTemp = document.getElementById("temp");
let feelLike = document.getElementById("feelLike");
let cityName = document.getElementById("cityName");
let weather = document.getElementById("weather");
let cloudy = document.getElementById("cloudy");
let humidity = document.getElementById("humidity");
let rain = document.getElementById("rain");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let inputSearch = document.getElementById("inputField");
let searchBtn = document.getElementById("searchBtn");
let searchList = document.querySelector(".search-list");
let dateTime = document.getElementById("dateTime");
let allCity = [];
let interval;
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=64e138c149426df3a8b7a134d6f6a5f4&units=metric&q=";
getWeather(apiUrl, "cairo");

searchBtn.addEventListener("click", (_) => {
  if (inputSearch.value) getWeather(apiUrl, inputSearch.value);
});

inputSearch.addEventListener("input", (_) => {
  let cityList = [];
  if (inputSearch.value) {
    allCity.forEach((city) => {
      if (city.name.toLowerCase().startsWith(inputSearch.value.toLowerCase())) {
        cityList.push(city);
        cityList.sort();
        cityList.splice(25);
      }
    });
    let e = "";
    cityList.forEach((city) => {
      e += `
                    <li data-cityName="${city.name}">${city.name} - country:${city.country}</li>
                `;
    });
    searchList.innerHTML = e;
  } else {
    searchList.innerHTML = `
        <li data-cityName="Makkah Province">Makkah Province</li>
        <li data-cityName="cairo">cairo</li>
        <li data-cityName="dubai">dubai</li>
        <li data-cityName="alexandria">alexandria</li>
        <li data-cityName="New York">New York</li>
        <li data-cityName="london">london</li>
        <li data-cityName="paris">paris</li>
        <li data-cityName="moscow">moscow</li>
        <li data-cityName="berlin">berlin</li>
        `;
  }

  searchListEvent();
});

function searchListEvent() {
  document.querySelectorAll(".search-list li").forEach((e) => {
    e.addEventListener("click", (_) => {
      getWeather(apiUrl, e.getAttribute("data-cityName"));
    });
  });
}

function getWeather(url, city) {
  searchBtn.innerHTML = '<span class="loader"></span>';
  mainTemp.innerHTML = `<span class='loader-temp'></span>`;
  feelLike.innerHTML = `--°`;
  cityName.innerHTML = "please white";
  weather.innerHTML = "----";
  cloudy.innerHTML = "--%";
  humidity.innerHTML = "--%";
  wind.innerHTML = "-Km/h";
  dateTime.innerHTML = "--/--/-- - --:--:--";
  pressure.innerHTML = "----mber";
  axios
    .get(url + city)
    .then((response) => {
      addWeatherData(response.data);
    })
    .catch((error) => {
      searchBtn.innerHTML = '<i class="fa fa-search"></i>';
      mainTemp.innerHTML = `--°`;
      feelLike.innerHTML = `--°`;
      cityName.innerHTML = error.response.data.message + "!";
      weather.innerHTML = "----";
      cloudy.innerHTML = "--%";
      humidity.innerHTML = "--%";
      wind.innerHTML = "-Km/h";
      pressure.innerHTML = "----mber";
      dateTime.innerHTML = "--/--/-- - --:--:--";
      document.body.style.backgroundImage =
        "url(https://i.pinimg.com/originals/00/ab/38/00ab38b9af71e36ea7f3fc43225e40bf.jpg)";
    });
}
function addWeatherData(response) {
  searchBtn.innerHTML = '<i class="fa fa-search"></i>';
  mainTemp.innerHTML = `${Math.round(response.main.temp)}°`;
  feelLike.innerHTML = `${Math.round(response.main.feels_like)}°`;
  cityName.innerHTML = response.name;
  if (response.weather[0].main == "Clear") {
    weather.innerHTML = `<i class="fa-solid fa-sun"></i>
            <p>${response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://e0.pxfuel.com/wallpapers/761/722/desktop-wallpaper-the-sky-grass-clouds-tree-green-grass-sky-trees-landscape-all-alone-in-this-world-the-sun-for-section-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6%D0%B8.jpg)";
  } else if (response.weather[0].main == "Clouds") {
    weather.innerHTML = `<i class="fa-solid fa-cloud"></i>
            <p>${response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://i.pinimg.com/564x/d4/54/9b/d4549b73f21bd391db074dcaf8325f26.jpg)";
  } else if (response.weather[0].main == "Rain") {
    weather.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>
            <p>${request.response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://images.skynewsarabia.com/images/v1/2019/11/28/1301323/800/450/1-1301323.jpg)";
  } else if (response.weather[0].main == "Drizzle") {
    weather.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>
            <p>${response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://flashradio.ma/wp-content/uploads/2023/09/rain-750x375.jpg)";
  } else if (
    response.weather[0].main == "Mist" ||
    response.weather[0].main == "Haze"
  ) {
    weather.innerHTML = `<i class="fa-solid fa-water"></i>
            <p>${response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://i.pinimg.com/originals/93/78/ac/9378acf4969f15e9c74bd101acf2e0ab.jpg)";
  } else if (response.weather[0].main == "Snow") {
    weather.innerHTML = `<i class="fa-regular fa-snowflake"></i>
            <p>${response.weather[0].description}</p>`;
    document.body.style.backgroundImage =
      "url(https://i.pinimg.com/564x/e1/b7/b8/e1b7b8b0e82d8bacd6434c1590fd513d.jpg)";
  }
  cloudy.innerHTML = response.clouds.all + "%";
  humidity.innerHTML = response.main.humidity + "%";
  wind.innerHTML = Math.round(response.wind.speed) + "Km/h";
  pressure.innerHTML = response.main.pressure + "mber";
  clearInterval(interval);
  interval = setInterval((_) => {
    dateTime.innerHTML = getTime(response.timezone);
  }, 1000);
}

(function getCityList() {
  searchList.innerHTML = "<div class='loader'></div>";
  axios
    .get(
      "https://xiqdbsjorquorlgojezr.supabase.co/rest/v1/city-name?select=*",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcWRic2pvcnF1b3JsZ29qZXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwOTc3NzEsImV4cCI6MjAyMDY3Mzc3MX0.LHLdB2_aYIr6cq1bfVMBFsDcvC-LOs19oGcchJYIV8o",
        },
      }
    )
    .then((response) => {
      allCity = response.data;
      searchList.innerHTML = `
    <li data-cityName="Makkah Province">Makkah Province</li>
    <li data-cityName="cairo">cairo</li>
    <li data-cityName="dubai">dubai</li>
    <li data-cityName="alexandria">alexandria</li>
    <li data-cityName="New York">New York</li>
    <li data-cityName="london">london</li>
    <li data-cityName="paris">paris</li>
    <li data-cityName="moscow">moscow</li>
    <li data-cityName="berlin">berlin</li>
    `;
      searchListEvent();
    })
    .catch((_) => {
      searchList.innerHTML = "<h3>Cty names are not available</h3>";
    });
})();

function getTime(timezone) {
  let currentTime = new Date();
  let utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * (timezone / 60 / 60)).toLocaleString();
}
