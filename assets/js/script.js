//(https://openweathermap.org/api)
var searchCity = document.querySelector('#searchCity').value;
var searchFormEl = document.querySelector('#cities');
var currentDay = document.querySelector('#current-city')
var apiKey = '44fc609f492616405803745592784814';
var city_Array = [];


function savedCities(searchCity) {
    city_Array.push(searchCity)
    //city_Array = [ searchCity, searchCitySubmit ];
    console.log("city array variable: ", city_Array);
    localStorage.setItem("cities", JSON.stringify(city_Array));

}
function loadData() {

    var loadData = localStorage.getItem("cities")
    if (loadData == null || loadData == "") return;

    var cityButtonArr = JSON.parse(loadData)

    for (i = 0; i < cityButtonArr.length; i++) {
        var createBtn = $("<button>")
        createBtn.attr("class", "btn btn-outline-secondary")
        createBtn.attr("type", "button")
        createBtn.text(cityButtonArr[i])

    }
    $("#cityhistory").append(createBtn)
}

//function submitBtn() {
    //var cityBtn = createBtn.value
    //var test = searchCity.text(cityBtn)
    //console.log(test)
    //.addEventListener("click", searchCitySubmit)
    // cityBtn.

//}
// create on button click 
// create button. on click 
// submit btn 



function searchCitySubmit(event) {
    event.preventDefault();

    var searchCity = document.querySelector('#searchCity').value

    if (!searchCity) {
        console.error('You need to search a proper city');
        return;
    }
    savedCities(searchCity)
    loadData()
   // submitBtn()
    var locQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=imperial`;

    fetch(locQueryUrl)
        .then(function (res) {
            return res.json()
        })

        .then(function (currentdata) {

            console.log(currentdata)
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



            var weekQueryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentdata.coord.lat}&lon=${currentdata.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`

            fetch(weekQueryUrl)
                .then(function (res) {
                    return res.json()
                })

                .then(function (forecastdata) {

                    console.log(forecastdata)
                    //day1 forecast
                    day1Date = document.querySelector("#day1Date")
                    day1Weather = document.querySelector("#day1weather")
                    day1Temp = document.querySelector("#day1temp")
                    day1Humid = document.querySelector("#day1humid")
                    day1Wind = document.querySelector("#day1wind")

                    day1Date.textContent = moment.unix(forecastdata.daily[1].dt).format("MMM D, YYYY");
                    day1Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.daily[1].weather[0].icon + ".png")
                    day1Temp.textContent = 'Temperature: ' + forecastdata.daily[1].temp.day + '°F';
                    day1Humid.textContent = 'Humidity: ' + forecastdata.daily[1].humidity + '%';
                    day1Wind.textContent = 'Wind Speed: ' + forecastdata.daily[1].wind_speed + 'mph';

                    //day 2 forecast
                    day2Date = document.querySelector("#day2Date")
                    day2Weather = document.querySelector("#day2weather")
                    day2Temp = document.querySelector("#day2temp")
                    day2Humid = document.querySelector("#day2humid")
                    day2Wind = document.querySelector("#day2wind")

                    day2Date.textContent = moment.unix(forecastdata.daily[2].dt).format("MMM D, YYYY");
                    day2Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.daily[2].weather[0].icon + ".png")
                    day2Temp.textContent = 'Temperature: ' + forecastdata.daily[2].temp.day + '°F';
                    day2Humid.textContent = 'Humidity: ' + forecastdata.daily[2].humidity + '%';
                    day2Wind.textContent = 'Wind Speed: ' + forecastdata.daily[2].wind_speed + 'mph';


                    ///Day3forceast//
                    day3Date = document.querySelector("#day3Date")
                    day3Weather = document.querySelector("#day3weather")
                    day3Temp = document.querySelector("#day3temp")
                    day3Humid = document.querySelector("#day3humid")
                    day3Wind = document.querySelector("#day3wind")

                    day3Date.textContent = moment.unix(forecastdata.daily[3].dt).format("MMM D, YYYY");
                    day3Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.daily[3].weather[0].icon + ".png")
                    day3Temp.textContent = 'Temperature: ' + forecastdata.daily[3].temp.day + '°F';
                    day3Humid.textContent = 'Humidity: ' + forecastdata.daily[3].humidity + '%';
                    day3Wind.textContent = 'Wind Speed: ' + forecastdata.daily[3].wind_speed + 'mph';

                    //Day 4 forecast//
                    day4Date = document.querySelector("#day4Date")
                    day4Weather = document.querySelector("#day4weather")
                    day4Temp = document.querySelector("#day4temp")
                    day4Humid = document.querySelector("#day4humid")
                    day4Wind = document.querySelector("#day4wind")

                    day4Date.textContent = moment.unix(forecastdata.daily[4].dt).format("MMM D, YYYY");
                    day4Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.daily[4].weather[0].icon + ".png")
                    day4Temp.textContent = 'Temperature: ' + forecastdata.daily[4].temp.day + '°F';
                    day4Humid.textContent = 'Humidity: ' + forecastdata.daily[4].humidity + '%';
                    day4Wind.textContent = 'Wind Speed: ' + forecastdata.daily[4].wind_speed + 'mph';

                    //Day 5 forecast//
                    day5Date = document.querySelector("#day5Date")
                    day5Weather = document.querySelector("#day5weather")
                    day5Temp = document.querySelector("#day5temp")
                    day5Humid = document.querySelector("#day5humid")
                    day5Wind = document.querySelector("#day5wind")

                    day5Date.textContent = moment.unix(forecastdata.daily[5].dt).format("MMM D, YYYY");
                    day5Weather.setAttribute("src", "http://openweathermap.org/img/w/" + forecastdata.daily[5].weather[0].icon + ".png")
                    day5Temp.textContent = 'Temperature: ' + forecastdata.daily[5].temp.day + '°F';
                    day5Humid.textContent = 'Humidity: ' + forecastdata.daily[5].humidity + '%';
                    day5Wind.textContent = 'Wind Speed: ' + forecastdata.daily[5].wind_speed + 'mph';



                })
        })
}

searchFormEl.addEventListener('submit', searchCitySubmit);

savedCities()






