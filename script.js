
window.onload = ()=>{
  document.getElementsByTagName('button')[0].addEventListener('click', searchCity);
}
// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
    returns a  promise
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL  = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
  // console.log(FULL_URL);
  const weatherPromise = fetch(FULL_URL)
  return weatherPromise.then(
    (response)=>{
      return response.json();
    }
  ).catch((error)=>console.log(error));
}


/**
 * Retrieve city input and get the weather data
 */
searchCity = (e) => {
  e.preventDefault();
  const city = document.getElementById('city-input').value;
  const data = getWeatherData(city);
  data.then((response)=>{
    //console.log(response);
    showWeatherData(response)
  }).catch((error)=>{
    document.getElementById('city-input').value ="";
    alert('City Not Found');
    console.log(error);
  })
  //console.log(data.weather.main);
  

}

/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
  // console.log(weatherData.main.temp);
  // console.log(weatherData.main.temp_min);
  // console.log(weatherData.main.temp_max);
  // console.log(weatherData.weather[0].description);
  document.getElementById('temp').innerText = weatherData.main.temp;
  document.getElementById('min-temp').innerText = weatherData.main.temp_min;
  document.getElementById('max-temp').innerText = weatherData.main.temp_max;
  document.getElementById('feels-like').innerText = weatherData.main.feels_like;
  document.getElementById('weather-type').innerText = weatherData.weather[0].main;
  document.getElementById('city-name').innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  
  
}

