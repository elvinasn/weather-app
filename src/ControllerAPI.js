import { City } from "./city";
const ControllerAPI = (() => {
  const KEY = "ec3ad567ee737d86887a91d6dd7a0000";
  let currentCity;
  const convertTime = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const populateCityInfo = (data) => {
    currentCity = City(
      data.name,
      Math.round(data.main.temp),
      Math.round(data.main.feels_like),
      data.visibility / 1000,
      Math.round(data.wind.speed),
      data.wind.deg,
      data.main.pressure,
      data.main.humidity,
      convertTime(data.dt),
      data.weather[0].description,
      data.weather[0].icon
    );
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
      console.log(data);
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
  const getCurrentCity = () => currentCity;

  return { getCurrentCity, callCoordAPI, callCityAPI };
})();
export { ControllerAPI };
