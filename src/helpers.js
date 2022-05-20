import { ControllerAPI } from "./ControllerAPI";
import { dom } from "./dom";
const helpers = (() => {
  const getDirection = (degrees) => {
    const directions = [
      "north",
      "northeast",
      "east",
      "southeast",
      "south",
      "southwest",
      "west",
      "northwest",
    ];
    let splitted = (degrees * 8) / 360;
    splitted = Math.round(splitted, 0);
    splitted = (splitted + 8) % 8;
    return directions[splitted];
  };
  return { getDirection };
})();
export { helpers };
