import { ControllerAPI } from "./ControllerAPI";
import { helpers } from "./helpers";
import { dom } from "./dom";
const domMarkups = (() => {
  const mainCard = () => {
    dom.Clear();
    const forecast = ControllerAPI.getCurrentForecast();
    const units = localStorage.getItem("units") === "metric" ? "C" : "F";
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
        <p class="card__temp">${forecast.current.temp}°${units}</p>
        <p>feels like ${forecast.current.feelsLike}°${units}</p>
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
  const dailyMarkup = (day) => {
    const units = localStorage.getItem("units") === "metric" ? "C" : "F";

    return `
  <div class="day__content">
      <p class="day__date">${day.date.weekDay} ${day.date.month}-${day.date.day}</p>
      <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="" />
      <p class="day__temp">
        <span class="temp__day">${day.tempDay}°${units}</span
        ><span class="temp__night">${day.tempNight}°${units}</span>
      </p>
    </div>`;
  };

  const hourlyMarkup = (hour) => {
    const units = localStorage.getItem("units") === "metric" ? "C" : "F";
    return `
    <div class="hour__content swiper-slide">
              <p class="day__date">${hour.time}</p>
              <img src="http://openweathermap.org/img/wn/${hour.icon}@2x.png" alt="" />
              <p class="day__temp">
                <span class="temp__day">${hour.temp}°${units}</span>
              </p>
            </div>
    `;
  };

  const dailyCard = () => {
    const forecast = ControllerAPI.getCurrentForecast();
    return `
    <div class="daily-card">
      ${forecast.daily
        .map((day) => dailyMarkup(day))
        .join(`<div class="gap__fill"></div>`)}
      </div>`;
  };
  const hourlyCard = () => {
    const forecast = ControllerAPI.getCurrentForecast();
    return `
    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${forecast.hourly.map((hour) => hourlyMarkup(hour)).join("")}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    `;
  };

  const spinner = () =>
    `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

  return { mainCard, dailyCard, hourlyCard, spinner };
})();
export { domMarkups };
