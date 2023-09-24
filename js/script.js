let mainTemp = document.getElementById('temp')
let feelLike = document.getElementById('feelLike')
let cityName = document.getElementById('cityName')
let weather = document.getElementById('weather')
let cloudy = document.getElementById('cloudy')
let humidity = document.getElementById('humidity')
let rain = document.getElementById('rain')
let wind = document.getElementById('wind')
let pressure = document.getElementById('pressure')
let inputSearch = document.getElementById('inputField')
let searchBtn = document.getElementById('searchBtn')
let searchListItems = document.querySelectorAll('.search-list li')
let searchList = document.querySelector('.search-list')
let allCity = []
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=64e138c149426df3a8b7a134d6f6a5f4&units=metric&q='

getWeather(apiUrl, 'cairo')

searchBtn.addEventListener('click', _ => {
    if (inputSearch.value) getWeather(apiUrl, inputSearch.value)
})

inputSearch.addEventListener("keyup", _ => {
    let cityList = []
    if (inputSearch.value) {
        allCity.forEach(city => {
            if (city.name.toLowerCase().startsWith(inputSearch.value.toLowerCase())) {
                cityList.push(city)
                cityList.sort()
                cityList.splice(25)
            }
        })
        let e = ''
        cityList.forEach(city => {
            e += `
                    <li onclick='getWeather("${apiUrl}","${city.name}")'>${city.name} - country:${city.country}</li>
                `
        })
        searchList.innerHTML = e
    } else {
        searchList.innerHTML = `
        <li onclick='getWeather("${apiUrl}",this.textContent)'>cairo</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>dubi</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>alexandria</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>New York</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>Landen</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>paris</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>moscow</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>Bani Suwayf</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>berlin</li>
        <li onclick='getWeather("${apiUrl}",this.textContent)'>be</li>
        `
    }
    searchListItems = document.querySelectorAll('.search-list li')
})

searchListItems.forEach(e => {
    e.addEventListener('click', _ => {
        getWeather(apiUrl, e.textContent)
    })
})
function getWeather(url, city) {
    searchBtn.innerHTML = '<span class="loader"></span>'
    mainTemp.innerHTML = `<span class='loader-temp'></span>`
    feelLike.innerHTML = `--°`
    cityName.innerHTML = 'please white'
    weather.innerHTML = '----'
    cloudy.innerHTML = '--%'
    humidity.innerHTML = '--%'
    wind.innerHTML = '-Km/h'
    pressure.innerHTML = '----mber'
    let request = new XMLHttpRequest
    request.open('GET', url + city)
    request.responseType = 'json'
    request.send()
    request.onload = _ => {
        searchBtn.innerHTML = '<i class="fa fa-search"></i>'
        if (request.status >= 200 && request.status < 300) {
            mainTemp.innerHTML = `${Math.round(request.response.main.temp)}°`
            feelLike.innerHTML = `${Math.round(request.response.main.feels_like)}°`
            cityName.innerHTML = request.response.name
            if (request.response.weather[0].main == 'Clear') {
                weather.innerHTML = `<i class="fa-solid fa-sun"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/sunny.jpg)'
            } else if (request.response.weather[0].main == 'Clouds') {
                weather.innerHTML = `<i class="fa-solid fa-cloud"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/clouds.jpg)'
            } else if (request.response.weather[0].main == 'Rain') {
                weather.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/rain.jpg)'
            } else if (request.response.weather[0].main == 'Drizzle') {
                weather.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/drizzle.jpg)'
            } else if (request.response.weather[0].main == 'Mist' || request.response.weather[0].main == 'Haze') {
                weather.innerHTML = `<i class="fa-solid fa-water"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/mist.jpg)'
            } else if (request.response.weather[0].main == 'Snow') {
                weather.innerHTML = `<i class="fa-regular fa-snowflake"></i>
                <p>${request.response.weather[0].description}</p>`
                document.body.style.backgroundImage = 'url(/assets/imgs/snow.jpg)'
            }
            cloudy.innerHTML = request.response.clouds.all + '%'
            humidity.innerHTML = request.response.main.humidity + '%'
            wind.innerHTML = Math.round(request.response.wind.speed) + 'Km/h'
            pressure.innerHTML = request.response.main.pressure + 'mber'
        } else {
            mainTemp.innerHTML = `--°`
            feelLike.innerHTML = `--°`
            cityName.innerHTML = 'city is not found!'
            weather.innerHTML = '----'
            cloudy.innerHTML = '--%'
            humidity.innerHTML = '--%'
            wind.innerHTML = '-Km/h'
            pressure.innerHTML = '----mber'
            document.body.style.backgroundImage = 'url(/assets/imgs/universe.jpg)'
        }
    }
}

function getCity() {
    let allCityRequest = new XMLHttpRequest
    allCityRequest.open('GET', '../city.list.json')
    allCityRequest.responseType = 'json'
    allCityRequest.send()
    allCityRequest.onload = _ => {
        allCity = allCityRequest.response
    }
}
getCity()















