/* fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=ac8312e9e2bb7a4d11aca228f9e6c236"
)
  .then((response) => response.json())
  .then((result) => {
    nowTemp = Math.round(result.main.temp - 273,15);
    feels = Math.round(result.main['feels_like'] - 273,15);
    city = result.name;
    weather = result.weather[0].main;
    description = result.weather[0].description;
    console.log(nowTemp);
    console.log(feels);
    console.log(city);
    console.log(weather);
    console.log(description);
  });

let nowTemp = 0,
  feels = 0,
  city = "",
  description = "",
  weather = "";
 */

/* const getDailyWeather = async (lat, lon) => {
  const newLat = String(lat);
  const newLon = String(lon);
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${newLat}&lon=${newLon}&exclude=daily&appid=ac8312e9e2bb7a4d11aca228f9e6c236`
  );
  const result = await response.json();
  console.log(result);
  return result;
};

const getWeather = async (evt) => {
  evt.preventDefault();
  if (input.value.length > 0) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=ac8312e9e2bb7a4d11aca228f9e6c236`
    );
    const result = await response.json();
    const weather = await getDailyWeather(result[0].lat, result[0].lon);
    form.reset();
  }
};

form.addEventListener("submit", getWeather);
 */

/* const getWeather = async (evt) => {
  evt.preventDefault();
  if (input.value.length > 0) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=`
    );
    const result = await response.json();
    const responses = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${result[0].lat}&lon=${result[0].lon}&exclude=daily&appid=ac8312e9e2bb7a4d11aca228f9e6c236`
    );
    const results = await responses.json();
    console.log(results);
    form.reset();
  }
};

form.addEventListener("submit", getWeather); */

/*   fetch(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=43.9108041&lon=39.3314689&appid=ac8312e9e2bb7a4d11aca228f9e6c236`
  )
    .then((response) => response.json())
    .then((result) => console.log(result));
 */
/*   if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      console.log(lat, lon);

    });
  } */

/*   form = document.querySelector(".form__submit"),
  input = document.querySelector(".input"),
  btn = document.querySelector(".btn"), */
window.addEventListener("load", () => {
  const weather = document.querySelector(".weather"),
    temp = document.querySelector(".temp"),
    feels = document.querySelector(".feels"),
    city = document.querySelector(".city");

  const getMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getInfo(latitude, longitude);
      });
    }
  };
  const getInfo = async (latitude, longitude) => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac8312e9e2bb7a4d11aca228f9e6c236&lang=ru&units=metric`
    );
    const result = await request.json();
    city.innerHTML = `Город - ${result.name}.\n`;
    temp.innerHTML = `Температура равна ${Math.round(
      result.main.temp
    )} градусам цельсия.\n`;
    feels.innerHTML = `Ощущается как ${Math.round(
      result.main["feels_like"]
    )} градусов цельсия из-за влажности в ${result.main.humidity}%\n.`;
    weather.innerHTML = `Погода - ${result.weather[0].description}.\n`;
  };
  getMyPosition();
});
