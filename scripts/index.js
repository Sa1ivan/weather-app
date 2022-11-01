import { utils, formSetting } from "./utils.js";

class Weather {
  constructor({ weather, temp, feels, city }, submitInput) {
    this._weather = weather;
    this._temp = temp;
    this._feels = feels;
    this._city = city;
    this._submitInput = submitInput;
  }

  _getSubmitPosition = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this._submitInput.value}&appid=ac8312e9e2bb7a4d11aca228f9e6c236&lang=ru&units=metric`
    )
      .then((request) => request.json())
      .then((result) => {
        const { lat, lon } = result.coord;
        this._getInfo(lat, lon);
      });
  };

  getMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this._getInfo(latitude, longitude);
      });
    }
  }

  _getInfo = async (latitude, longitude) => {
    this.request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac8312e9e2bb7a4d11aca228f9e6c236&lang=ru&units=metric`
    );
    this.result = await this.request.json();
    this._city.innerHTML = this.result.name;
    this._temp.innerHTML = Math.round(this.result.main.temp);
    this._feels.innerHTML = Math.round(this.result.main["feels_like"]);
    this._weather.innerHTML = this.result.weather[0].description;
  };

  render = () => {
    this.getMyPosition();
  };
}
const { submitInput, submitForm } = formSetting;
const myPosBtn = document.querySelector(".information__btn");
const weather = new Weather({ ...utils }, submitInput);
weather.render();

submitForm.addEventListener("submit", () => {
  weather._getSubmitPosition();
  submitForm.reset();
});

myPosBtn.addEventListener("click", weather.getMyPosition);
