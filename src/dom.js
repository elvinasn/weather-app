import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const dom = (() => {
  const main = document.querySelector("main");
  const callByLocation = async function (location) {
    await ControllerAPI.callCoordAPI(
      location.coords.latitude,
      location.coords.longitude,
      "metric"
    );
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

  const callByCity = async function (city) {
    await ControllerAPI.callCityAPI(city, "metric");
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

  function errorCallback() {
    callByCity("Vilnius");
  }
  const init = () => {
    navigator.geolocation.getCurrentPosition(callByLocation, errorCallback);
  };

  return { init };
})();
export { dom };
