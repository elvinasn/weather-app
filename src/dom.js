import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const dom = (() => {
  const main = document.querySelector("main");
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Clear();
    main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
    callByCity(document.getElementById("location").value);
  });
  const Clear = () => {
    main.innerHTML = "";
  };

  const insertForecast = () => {
    main.insertAdjacentHTML("beforeend", domMarkups.mainCard());
    main.insertAdjacentHTML("beforeend", domMarkups.dailyCard());
    main.insertAdjacentHTML("beforeend", domMarkups.hourlyCard());
    const swiper = new Swiper(".mySwiper", {
      modules: [Navigation],
      slidesPerView: 8,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };
  const callByLocation = async function (location) {
    await ControllerAPI.callCoordAPI(
      location.coords.latitude,
      location.coords.longitude,
      localStorage.getItem("units")
    );
    insertForecast();
  };

  const callByCity = async function (city) {
    await ControllerAPI.callCityAPI(city, localStorage.getItem("units"));
    insertForecast();
  };

  function errorCallback() {
    callByCity("Vilnius");
  }
  const init = () => {
    main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
    const check = document.querySelector("input[type=checkbox]");
    const value = localStorage.getItem("units");
    if (!value) {
      localStorage.setItem("units", "metric");
    } else {
      check.checked = value !== "metric";
    }
    check.addEventListener("change", () => {
      localStorage.setItem("units", check.checked ? "imperial" : "metric");
      Clear();
      main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
      navigator.geolocation.getCurrentPosition(callByLocation, errorCallback);
    });
    navigator.geolocation.getCurrentPosition(callByLocation, errorCallback);
  };

  return { init, Clear };
})();
export { dom };
