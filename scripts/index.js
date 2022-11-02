import { utils, formSetting } from "./utils.js";

class Weather {
  constructor({ weather, temp, feels, city, btn, submitForm, submitInput }) {
    this._weather = weather;
    this._temp = temp;
    this._feels = feels;
    this._city = city;
    this._btn = btn;
    this._submitForm = submitForm;
    this._submitInput = submitInput;
  }

  _setEventListeners = () => {
    this._submitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getSubmitPosition();
      this._submitForm.reset();
    });

    this._btn.addEventListener("click", this._getMyPosition);
  };

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

  _getMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this._getInfo(latitude, longitude);
      });
    }
  };

  _getInfo = async (latitude, longitude) => {
    this._request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac8312e9e2bb7a4d11aca228f9e6c236&lang=ru&units=metric`
    );
    this._result = await this._request.json();
    this._renderWeather();
  };

  _renderWeather = () => {
    this._city.innerHTML = this._result.name;
    this._temp.innerHTML = Math.round(this._result.main.temp);
    this._feels.innerHTML = Math.round(this._result.main["feels_like"]);
    this._weather.innerHTML = this._result.weather[0].description;
  };

  render = () => {
    this._getMyPosition();
    this._setEventListeners();
  };
}

const weather = new Weather({ ...utils, ...formSetting });
weather.render();
