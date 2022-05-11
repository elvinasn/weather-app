import { City } from "./city";
const ControllerAPI = (() => {
  const KEY = "ec3ad567ee737d86887a91d6dd7a0000";
  let currentCity;

  const populateCityInfo = (data) => {
    currentCity = City(
      data.name,
      Math.round(data.main.temp),
      data.main.feels_like,
      data.visibility / 1000,
      Math.round(data.wind.speed),
      data.wind.deg,
      data.main.pressure
    );
    console.log(currentCity);
  };

  const callCoordAPI = async function (lat, lon, units) {
    let data;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      data = await response.json();
      populateCityInfo(data);
    } catch (error) {
      console.log("s");
      throw error;
    }
  };

  const callCityAPI = async function (cityName, units) {
    let data;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      data = await response.json();
      populateCityInfo(data);
    } catch (error) {
      console.log("s");
      throw error;
    }
  };

  return { callCoordAPI, callCityAPI };
})();
export { ControllerAPI };
