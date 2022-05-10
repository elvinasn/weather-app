import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";

const dom = (() => {
  const main = document.querySelector("main");
  const init = () => {
    let data;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords.latitude);
        (async () => {
          data = await ControllerAPI.callCoordAPI(
            location.coords.latitude,
            location.coords.longitude,
            "metric"
          );
          console.log(data);
        })();
      });
    } else {
      (async () => {
        data = await ControllerAPI.callCityAPI("Vilnius", "metric");
      })();
    }
    main.insertAdjacentHTML("afterbegin", domMarkups.mainCard(data));
  };
  return { init };
})();
export { dom };
