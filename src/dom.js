import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";

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
  };

  const callByCity = async function (city) {
    await ControllerAPI.callCityAPI(city, "metric");
    main.insertAdjacentHTML("beforeend", domMarkups.mainCard());
    main.insertAdjacentHTML("beforeend", domMarkups.dailyCard());
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
