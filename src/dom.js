import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";

const dom = (() => {
  const main = document.querySelector("main");

  const init = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(helpers.callByLocation);
    } else {
      ControllerAPI.callCityAPI("Vilnius", "metric");
    }
  };
  return { init };
})();
export { dom };
