import { ControllerAPI } from "./ControllerAPI";
import { helpers } from "./helpers";
const domMarkups = (() => {
  const mainCard = () => {
    const forecast = ControllerAPI.getCurrentForecast();
    return `<div class="main-card">
      <div class="card__top">
        <h2>${forecast.name}</h2>
        <p>${forecast.current.time}</p>
      </div>
      <div class="card__bot">
        <div class="card__left">
          <img src="http://openweathermap.org/img/wn/${
            forecast.current.icon
          }@2x.png" alt="" />
          <p>${forecast.current.description}</p>
        </div>
      <div class="card__middle">
        <p class="card__temp">${forecast.current.temp}°C</p>
        <p>feels like ${forecast.current.feelsLike}°C</p>
      </div>
      <div class="card__right">
        <p><span>Pressure: </span>${forecast.current.pressure} hPa</p>
        <p><span>Humidity: </span>${forecast.current.humidity}%</p>
        <p><span>Visibility: </span>${forecast.current.visibility}km</p>
        <p><span>Wind: </span> ${helpers.getDirection(
          forecast.current.windDegrees
        )} ${forecast.current.windSpeed} m/s</p>
      </div>
    </div>
  </div>`;
  };
  const dailyMarkup = (day) => `
  <div class="day__content">
      <p class="day__date">${day.date.weekDay} ${day.date.month}-${day.date.day}</p>
      <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="" />
      <p class="day__temp">
        <span class="temp__day">${day.tempDay}°C</span
        ><span class="temp__night">${day.tempNight}°C</span>
      </p>
    </div>`;
  const dailyCard = () => {
    const forecast = ControllerAPI.getCurrentForecast();
    return `
    <div class="daily-card">
      ${forecast.daily
        .map((day) => dailyMarkup(day))
        .join(`<div class="gap__fill"></div>`)}
      </div>`;
  };

  return { mainCard, dailyCard };
})();
export { domMarkups };
