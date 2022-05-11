import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";

const dom = (() => {
  const main = document.querySelector("main");

  const callByLocation = async function (location) {
    await ControllerAPI.callCoordAPI(
      location.coords.latitudweatgh,
      location.coords.longitude,
      "metric"
    );
    main.insertAdjacentHTML("afterbegin", domMarkups.mainCard());
  };

  const callByCity = async function (city) { 
    await ControllerAPI.callCityAPI("Vilnius", "metric");
  };

  const init = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callByLocation);
    } else {
      callByCity("Vilnius");
    }
  };
  return { init };
})();
export { dom };
