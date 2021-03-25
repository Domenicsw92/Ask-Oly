//(https://openweathermap.org/api)

var searchFormEl = document.querySelector('#cities');
var currentDay = document.querySelector('#current-day')
var apiKey = '75e17b730a7e09e4ad97758508f4af65'

var currentAirQueryUrl = 'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}'
var forecastAirQueryUrl = 'http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={API key}';

var forecastUvQueryUrl = 'http://api.openweathermap.org/data/2.5/uvi/forecast?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}';

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#searchCity').value;
    console.log(searchInputVal)
    if (!searchInputVal) {
        console.error('You need to search a proper city');
        return;
    }

    var queryString = '#current-day' + searchInputVal;
    currentDay.textContent = searchInputVal

    location.assign(queryString);

    var locQueryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputVal}&appid=${apiKey}&units=imperial`;

    fetch(locQueryUrl)
        .then(function (res) {
            return res.json()
        })

        .then(function (currentdata) {

            console.log(currentdata)
            console.log(currentdata.main.temp)
            console.log(currentdata.main.humidity)
            console.log(currentdata.wind.speed)
            var currentDaytemp = document.querySelector('#current-daytemp')
            var currentDayhumid = document.querySelector('#current-dayhumid')
            var currentDaywind = document.querySelector('#current-daywind')
            var currentDayuv = document.querySelector('#current-dayuv')

            var uvQueryUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentdata.coord.lat}&lon=${currentdata.coord.lon}&appid=${apiKey}&units=imperial`;
            fetch(uvQueryUrl)
                .then(function (res) {
                    return res.json()
                })

                .then(function (uvdata) {
                    console.log(uvdata)
                    console.log(uvdata.value)
                })
                currentDaytemp.textContent = currentdata.main.temp;
                currentDayhumid.textContent = currentdata.main.humidity;
                currentDaywind.textContent = currentdata.wind.speed;
                currentDayuv.textContent = currentdata.uvdata.value;

        })


    var weekQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&appid=${apiKey}&units=imperial`;

    fetch(weekQueryUrl)
        .then(function (res) {
            return res.json()
        })

        .then(function (forecastdata) {
            console.log(forecastdata)
        })
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



