/* javascript to enable drag-scrolling */

// # 4 weather API global variables/ got it from the API
const weatherUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json?days=3&q=';
const weatherOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b1191f052bmsh9393381bd6d8022p103498jsna1764183a67a',
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};


// preparing variables
let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;


// #1 function to get the remote data from JSON 
async function getData(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw (response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

// #5 update weather display in the DOM based on passed object
function updateWeather(weatherObject) {

    // outputs the whole weather object to console
    console.log(weatherObject);

    // this updates the location name
    let locationName = weatherObject.location.name;
    if (weatherObject.location.region) {
        locationName += ", " + weatherObject.location.region;
    }
    document.querySelector("#location").innerHTML = locationName;

    // updates the current weather temp, status, humidity html
    document.querySelector("#currentTemp span").innerHTML = weatherObject.current.temp_f;
    document.querySelector("#currentStatus").innerHTML = weatherObject.current.condition.text;
    document.querySelector("#currentHumidity span").innerHTML = weatherObject.current.humidity;

    // outputs wind speed and direction in a combined string
    let windspeed = weatherObject.current.wind_mph;
    let winddirection = weatherObject.current.wind_dir;
    document.querySelector("#currentWind").innerHTML = windspeed + "mph " + winddirection;

    // finds all the future day blocks and loop through them, matching the forecast days in the weather 
    let futureDays = document.querySelectorAll(".futureDay");
    for (i = 0; i < futureDays.length; i++) {

        // update future temp
        futureDays[i].querySelector(".futureTemp span").innerHTML = weatherObject.forecast.forecastday[i].day.maxtemp_f;

        // update future windspeed
        windspeed = weatherObject.forecast.forecastday[i].day.maxwind_mph;
        futureDays[i].querySelector(".futureWind").innerHTML = windspeed + "mph ";

        // update future condition status
        futureDays[i].querySelector(".futureStatus").innerHTML = weatherObject.forecast.forecastday[i].day.condition.text;
    }
}



//#2  waits for DOM to load & has the scroll stuff for future info
document.addEventListener("DOMContentLoaded", function () {
    scrollingBox = document.querySelector("#futureInfo"); /* get a handle on the parent container by tag or ID */
    isMoving = false;

    scrollingBox.addEventListener("mousedown", function (e) {
        scrollLeftStart = scrollingBox.scrollLeft;
        offsetLeftStart = e.pageX - scrollingBox.offsetLeft;
        isMoving = true;
    });

    scrollingBox.addEventListener("mouseleave", function (e) {
        isMoving = false;
    });

    scrollingBox.addEventListener("mouseup", function (e) {
        isMoving = false;
    });

    scrollingBox.addEventListener("mousemove", function (e) {
        e.preventDefault();
        if (!isMoving) return;
        scrollingBox.scrollLeft = scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);
    });



    // #3 ipLookup data
    let ipLookupURL = "https://api.ipify.org/?format=json";
    let ipLookupOptions = {};

    // uses ajax to fetch IP in JSON format
    getData(ipLookupURL, ipLookupOptions).then(function(result) {
        
        // adds the IP number to the weather URL for lookup/takes the data from get data 
        let weatherLookupURL = weatherUrl + result.ip;
        console.log(weatherLookupURL);

        // uses the resulting IP number to look up weather
        getData(weatherLookupURL, weatherOptions).then(function(weatherResult){
            console.log(weatherResult);
            updateWeather(weatherResult);
        });

    });


    // makes the location button show the modal popup
    document.querySelector("#findLocation").addEventListener("click", function(){
        document.body.classList.toggle("showModal");
    });

    document.querySelector("#locationForm").addEventListener("submit", function(event){

        // stop form from submitting to server
	    event.preventDefault();
　　　　　
        //gets the value of the location box
        document.body.classList.toggle("showModal");
        let newLocation = document.querySelector("#locationBox").value;

        // adds the passed value to the weather URL so it can look it up
        let weatherLookupURL = weatherUrl + newLocation;
        console.log(weatherLookupURL);

        // uses the resulting IP number to look up weather
        getData(weatherLookupURL, weatherOptions).then(function(weatherResult){
            console.log(weatherResult);
            updateWeather(weatherResult);
        });

    });

});