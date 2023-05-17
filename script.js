

async function getWeather(city){
    try{
        let cityData =  await (await fetch(`http://api.weatherapi.com/v1/current.json?key=a42d86fe8fbf4c39add190104231605&q=${city}`, {mode: 'cors'})).json();
        console.log(cityData);
        let convert = document.getElementById("convert");
        convert.addEventListener("click", function(event){
            is_f = !is_f;
            displayWeather(cityData);
        });
        displayWeather(cityData);
    } catch(error) {
        console.log(error);
        let errorP = document.getElementById("error");
        errorP.style.visibility = "visible";
    }
}

function displayWeather(data){
    let locat = document.getElementById("locat");
    let img = document.getElementById("icon");
    let temp = document.getElementById("temp");
    let cond = document.getElementById("condition");
    let wind = document.getElementById("wind");
    let feel = document.getElementById("feel");
    let humidity = document.getElementById("humidity");

    locat.innerText = data.location.name + ", " + data.location.country;

    img.src = data.current.condition.icon;

    humidity.innerText = "Humidity: " + data.current.humidity + "%";

    cond.innerText = data.current.condition.text;
    if(is_f){
        wind.innerText = "Wind speed: " + data.current.wind_mph + " MPH";
        temp.innerText = Math.round(data.current.temp_f) + "°F";
        feel.innerText = "Feels like: " + Math.round(data.current.feelslike_f) + "°F";
    } else {
        wind.innerText = "Wind speed: " + data.current.wind_kph + " KPH";
        temp.innerText = Math.round(data.current.temp_c) + "°C";
        feel.innerText = "Feels like: " + Math.round(data.current.feelslike_c) + "°C";
    }
    

}

is_f = true;
getWeather("London");
let searchImg = document.getElementById("searchImg");
let search = document.getElementById("search");
searchImg.addEventListener("click", (e) => getWeather(search.value));
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") getWeather(search.value);
});



