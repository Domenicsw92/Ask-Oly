//(https://openweathermap.org/api)

var searchFormEl = document.querySelector('#cities');
var currentDay = document.querySelector('#current-city')
var apiKey = '44fc609f492616405803745592784814';
var foreCastDays = '5';
var forcecastApikey = '13d310a8ade98b5144daa56c623f1370';


function savedCities() {
    localStorage.setItem("cities", JSON.stringify(savedList));
}

function createdCitylist(searchInputVal) {
    var savedCities = document.createElement("button")
    savedCities.style.display = "block";
    savedCities.textContent = searchInputVal;
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchCity').value;
    console.log(searchInputVal)
    if (!searchInputVal) {
        console.error('You need to search a proper city');
        return;
    }

    var queryString = '#current-city'
    currentDay.textContent = searchInputVal
    createdCitylist(searchInputVal)
    location.assign(queryString);

    var locQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputVal}&appid=${apiKey}&units=imperial`;

    fetch(locQueryUrl)
        .then(function (res) {
            return res.json()
        })

        .then(function (currentdata) {

            console.log(currentdata)
            console.log(currentdata.weather.icon)
            console.log(currentdata.main.temp)
            console.log(currentdata.main.humidity)
            console.log(currentdata.wind.speed)
            var currentCity = document.querySelector('#selectedcity');
            var currentDayweather = document.querySelector('#current-dayweather');
            var currentDaytemp = document.querySelector('#current-daytemp');
            var currentDayFeel = document.querySelector('#current-daytempfeelLike');
            var currentDayhumid = document.querySelector('#current-dayhumid');
            var currentDaywind = document.querySelector('#current-daywind');
            var currentDayuv = document.querySelector('#current-dayuv');


            var uvQueryUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentdata.coord.lat}&lon=${currentdata.coord.lon}&appid=${apiKey}&units=imperial`;
            fetch(uvQueryUrl)
                .then(function (res) {
                    return res.json()
                })

                .then(function (uvdata) {
                    console.log(uvdata);
                    console.log(uvdata.value);
                    currentDayuv.textContent = 'Uv Index:' + uvdata.value;
                })
            currentCity.textContent = currentdata.name + "  " + "  " + moment().format('MMM D, YYYY');
            currentDayweather.setAttribute("src", "http://openweathermap.org/img/w/" + currentdata.weather[0].icon + ".png")
            currentDaytemp.textContent = 'Temperature: ' + currentdata.main.temp + '°F';
            currentDayFeel.textContent = 'Temperature Feels Like:  ' + currentdata.main.feels_like + '°F';
            currentDayhumid.textContent = 'Humidity: ' + currentdata.main.humidity + '%';
            currentDaywind.textContent = 'Wind Speed: ' + currentdata.wind.speed + 'mph';
        })



    var weekQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&appid=${apiKey}&units=imperial`;

    fetch(weekQueryUrl)
        .then(function (res) {
            return res.json()
        })

        .then(function (forecastdata) {
            
            console.log(forecastdata)
            day1Date = document.querySelector("#day1Date")
            day1Weather = document.querySelector("#day1weather")
            day1Temp = document.querySelector("#day1temp")
            day1Humid = document.querySelector("#day1humid")
            day1Wind = document.querySelector("#day1wind")

            day1Date.textContent = moment(forecastdata.list[2].dt_txt).format("MMM D, YYYY");
            day1Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.list[2].weather[0].icon + ".png")
            day1Temp.textContent = 'Temperature: ' + forecastdata.list[2].main.temp + '°F';
            day1Humid.textContent = 'Humidity: ' + forecastdata.list[2].main.humidity + '%';
            day1Wind.textContent = 'Wind Speed: ' + forecastdata.list[2].wind.speed + 'mph';

        
            day2Date = document.querySelector("#day2Date")
            day2Weather = document.querySelector("#day2weather")
            day2Temp = document.querySelector("#day2temp")
            day2Humid = document.querySelector("#day2humid")
            day2Wind = document.querySelector("#day2wind")

            day2Date.textContent = moment(forecastdata.list[10].dt_txt).format("MMM D, YYYY");
            day2Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.list[10].weather[0].icon + ".png")
            day2Temp.textContent = 'Temperature: ' + forecastdata.list[10].main.temp + '°F';
            day2Humid.textContent = 'Humidity: ' + forecastdata.list[10].main.humidity + '%';
            day2Wind.textContent = 'Wind Speed: ' + forecastdata.list[10].wind.speed + 'mph';


            ///Day3forceast//
            day3Date = document.querySelector("#day3Date")
            day3Weather = document.querySelector("#day3weather")
            day3Temp = document.querySelector("#day3temp")
            day3Humid = document.querySelector("#day3humid")
            day3Wind = document.querySelector("#day3wind")

            day3Date.textContent = moment(forecastdata.list[18].dt_txt).format("MMM D, YYYY");
            day3Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.list[18].weather[0].icon + ".png")
            day3Temp.textContent = 'Temperature: ' + forecastdata.list[18].main.temp + '°F';
            day3Humid.textContent = 'Humidity: ' + forecastdata.list[18].main.humidity + '%';
            day3Wind.textContent = 'Wind Speed: ' + forecastdata.list[18].wind.speed + 'mph';

            //Day 4 forecast//
            day4Date = document.querySelector("#day4Date")
            day4Weather = document.querySelector("#day4weather")
            day4Temp = document.querySelector("#day4temp")
            day4Humid = document.querySelector("#day4humid")
            day4Wind = document.querySelector("#day4wind")

            day4Date.textContent = moment(forecastdata.list[26].dt_txt).format("MMM D, YYYY");
            day4Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.list[26].weather[0].icon + ".png")
            day4Temp.textContent = 'Temperature: ' + forecastdata.list[26].main.temp + '°F';
            day4Humid.textContent = 'Humidity: ' + forecastdata.list[26].main.humidity + '%';
            day4Wind.textContent = 'Wind Speed: ' + forecastdata.list[26].wind.speed + 'mph';

            //Day 5 forecast//
            day5Date = document.querySelector("#day5Date")
            day5Weather = document.querySelector("#day5weather")
            day5Temp = document.querySelector("#day5temp")
            day5Humid = document.querySelector("#day5humid")
            day5Wind = document.querySelector("#day5wind")

            day5Date.textContent = moment(forecastdata.list[34].dt_txt).format("MMM D, YYYY");
            day5Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.list[34].weather[0].icon + ".png")
            day5Temp.textContent = 'Temperature: ' + forecastdata.list[34].main.temp + '°F';
            day5Humid.textContent = 'Humidity: ' + forecastdata.list[34].main.humidity + '%';
            day5Wind.textContent = 'Wind Speed: ' + forecastdata.list[34].wind.speed + 'mph';



        })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



