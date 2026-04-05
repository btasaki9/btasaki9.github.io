/* javascript to enabled drag-scrolling */

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
    console.log(weatherObject);
    document.querySelector("#currenttemp span").innerHTML = weatherObject.current.temp_f;
    document.querySelector("#currentstatus").innerHTML = weatherObject.current.condition.text;
    document.querySelector("#currenthumidity span").innerHTML = weatherObject.current.humidity;

    let windspeed = weatherObject.current.wind_mph;
    let winddirection = weatherObject.current.wind_dir;
    document.querySelector("#currentwind").innerHTML = windspeed + "mph " + winddirection;

    let futuredays = document.querySelectorAll(".futureday");
    for (i = 0; i < futuredays.length; i++) {
    futuredays[i].querySelector(".futuretemp").innerHTML = weatherObject.forecast.forecastday[i].day.maxtemp_f;
    
    windspeed = weatherObject.forecast.forecastday[i].day.maxwind_mph;
    futuredays[i].querySelector(".futurewind").innerHTML = windspeed + "mph ";

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


        let sampleURL = "https://tordevries.github.io/477/examples/ajax-api-test/current-forecast.js";
        let sampleOptions = {};


        //get sample data 
        getData(sampleURL, sampleOptions).then(function (result) {
            // code to operate on “result” JSON object
            updateWeather(result);
        });





    });
