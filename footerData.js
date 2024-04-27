
async function LocationUpdate(geolocation) {
    WeatherUpdate(geolocation);
    const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?
        latitude=${JSON.stringify(geolocation.coords.latitude)}
        &longitude=${JSON.stringify(geolocation.coords.longitude)}`
    );
    const json = await response.json();
    const continent = json.continent;
    const city = json.city;
    document.querySelector("#system-location").innerHTML = `${city}, ${continent}`;
}

async function WeatherUpdate(geolocation) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${JSON.stringify(geolocation.coords.latitude)}&longitude=${JSON.stringify(geolocation.coords.longitude)}&current=temperature_2m,weather_code`)
    const json = await response.json();
    const temp = json.current.temperature_2m;
    const weatherCode = json.current.weather_code;
    const weatherDescriptions = {
        "0": "Sunny",
        "1": "Mainly Sunny",
        "2": "Partly Cloudy",
        "3": "Cloudy",
        "45": "Foggy",
        "48": "Rime Fog",
        "51": "Light Drizzle",
        "53": "Drizzle",
        "55": "Heavy Drizzle",
        "56": "Light Freezing Drizzle",
        "57": "Freezing Drizzle",
        "61": "Light Rain",
        "63": "Rain",
        "65": "Heavy Rain",
        "66": "Light Freezing Rain",
        "67": "Freezing Rain",
        "71": "Light Snow",
        "73": "Snow",
        "75": "Heavy Snow",
        "77": "Snow Grains",
        "80": "Light Showers",
        "81": "Showers",
        "82": "Heavy Showers",
        "85": "Light Snow Showers",
        "86": "Snow Showers",
        "95": "Thunderstorm",
        "96": "Light Thunderstorms With Hail",
        "99": "Thunderstorm With Hail"
    };
    const weatherDescription = weatherDescriptions[weatherCode] || "Unknown";
    document.querySelector("#system-weather").innerHTML = `${temp}°C  - ${weatherDescription}`
}

function UpdateSystemTime(){
    const dateObject = new Date()
    const time = dateObject.toLocaleTimeString("en-uk");
    const date = dateObject.toLocaleDateString("en-uk");
    document.querySelector("#system-time").innerHTML = time;
    document.querySelector("#system-date").innerHTML = date;
}

function UpdateGeolocationData(){
    navigator.geolocation.getCurrentPosition(LocationUpdate);
}

UpdateGeolocationData();
const geolocationInterval = setInterval(UpdateGeolocationData, 1000*60*10);

UpdateSystemTime();
const systemTimeInterval = setInterval(UpdateSystemTime, 1000);