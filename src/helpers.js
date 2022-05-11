import { ControllerAPI } from "./ControllerAPI";
const helpers = (() => {
  const callByLocation = function (location) {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    ControllerAPI.callCoordAPI(
      location.coords.latitude,
      location.coords.longitude,
      "metric"
    );
  };
  return { callByLocation };
})();
export { helpers };
