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

  const populateCurrentInfo = (data) => {
    currentCity = City(
      data.name,
      Math.round(data.current.temp),
      Math.round(data.current.feels_like),
      data.current.visibility / 1000,
      Math.round(data.current.wind_speed),
      data.current.wind_deg,
      data.current.pressure,
      data.current.humidity,
      convertTime(data.current.dt),
      data.current.weather[0].description,
      data.current.weather[0].icon
    );
  };

  const callCoordAPI = async function (lat, lon, units) {
    let dataOneCall;
    try {
      const responseAll = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      dataOneCall = await responseAll.json();
      const responseCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      const dataCurrent = await responseCurrent.json();
      dataOneCall.name = dataCurrent.name;
      console.log(dataOneCall);
      populateCurrentInfo(dataOneCall);
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
