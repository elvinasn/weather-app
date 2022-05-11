import { ControllerAPI } from "./ControllerAPI";
const domMarkups = (() => {
  const mainCard = () => {
    const city = ControllerAPI.getCurrentCity();
    const markup = `<div class="main-card">
      <div class="card__top">
        <h2>${city.name}</h2>
        <p>${city.time}</p>
      </div>
      <div class="card__bot">
        <div class="card__left">
          <img src="http://openweathermap.org/img/wn/${city.icon}@2x.png" alt="" />
          <p>${city.description}</p>
        </div>
      <div class="card__middle">
        <p class="card__temp">${city.temp}°C</p>
        <p>feels like ${city.feelsLike}°C</p>
      </div>
      <div class="card__right">
        <p><span>Pressure: </span>${city.pressure} hPa</p>
        <p><span>Humidity: </span>${city.humidity}%</p>
        <p><span>Visibility: </span>${city.visibility}km</p>
        <p><span>Wind: </span> south-east ${city.wind} m/s</p>
      </div>
    </div>
  </div>`;
    return markup;
  };
  return { mainCard };
})();
export { domMarkups };
