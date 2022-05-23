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

  const convertTime = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const convertDate = (epoch) => {
    const date = new Date(epoch * 1000);
    return {
      weekDay: date.toLocaleString("default", { weekday: "short" }),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  };
  return { getDirection, convertDate, convertTime };
})();
export { helpers };
