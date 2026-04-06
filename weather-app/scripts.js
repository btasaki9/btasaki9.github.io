/* javascript to enabled drag-scrolling */

//weather API global variables
const weatherurl = 'https://weatherapi-com.p.rapidapi.com/forecast.json?days=3&q=';
const weatheroptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3933a62283msh6859f42dfe04d17p1da7cajsn41b441386073',
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};


//preparing variables
let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;


//function to get remove JSON data
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

//update weather display in the DOM based on passed object 
function updateWeather(weatherObject) {

    // outputting whole weather object to console
    console.log(weatherObject);

    //update current weather, temp, status, and humidity
    document.querySelector("#currenttemp span").innerHTML = weatherObject.current.temp_f;
    document.querySelector("#currentstatus").innerHTML = weatherObject.current.condition.text;
    document.querySelector("#currenthumidity span").innerHTML = weatherObject.current.humidity;

    //output wind speed and direction in a combined string
    let windspeed = weatherObject.current.wind_mph;
    let winddirection = weatherObject.current.wind_dir;
    document.querySelector("#currentwind").innerHTML = windspeed + "mph " + winddirection;

    //find all the future day blocks and loop through them, matching the forecast days in the weather object
    let futuredays = document.querySelectorAll(".futureday");
    for (i = 0; i < futuredays.length; i++) {

        //update future temp
        futuredays[i].querySelector(".futuretemp").innerHTML = weatherObject.forecast.forecastday[i].day.maxtemp_f;

        //update future wind speed
        windspeed = weatherObject.forecast.forecastday[i].day.maxwind_mph;
        futuredays[i].querySelector(".futurewind").innerHTML = windspeed + "mph ";

        //update future condition status
        futuredays[i].querySelector(".futurestatus").innerHTML = weatherObject.forecast.forecastday[i].day.condition.text;

    }

}

//wait for the DOM to load before running the code
document.addEventListener("DOMContentLoaded", function () {
    scrollingBox = document.querySelector("#futureinfo"); /* get a handle on the parent container by tag or ID */
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



    //ip lookup data
    let ipLookupURL = "https://api.ipify.org/?format=json";
    let ipLookupOptions = {};
   
    //use ajax to fetch IP in JSON format
    getData(ipLookupURL, ipLookupOptions).then(function(result) {
       
        //adding the IP number to the weather URL for lookup
        let weatherLookupURL = weatherUrl + result.ip;
        console.log(weatherLookupURL);

       //use the resulting IP number to look up weather 
       getData(weatherLookupURL, weatherOptions).then(function(weatherResult){
            console.log(weatherResult);
            updateWeather(weatherResult);
       });
       
   });


});
