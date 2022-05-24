import { Forecast } from "./forecast";
import { helpers } from "./helpers";
const ControllerAPI = (() => {
  const KEY = "ec3ad567ee737d86887a91d6dd7a0000";
  let currentForecast;

  const populateInfo = (data) => {
    const current = {
      temp: Math.round(data.current.temp),
      feelsLike: Math.round(data.current.feels_like),
      visibility: data.current.visibility / 1000,
      windSpeed: Math.round(data.current.wind_speed),
      windDegrees: data.current.wind_deg,
      pressure: data.current.pressure,
      humidity: data.current.humidity,
      time: helpers.convertTime(data.current.dt),
      description: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
    };

    const daily = data.daily.map((day) => ({
      date: helpers.convertDate(day.dt),
      tempDay: Math.round(day.temp.day),
      tempNight: Math.round(day.temp.night),
      icon: day.weather[0].icon,
    }));

    const hourly = data.hourly.map((hour) => ({
      time: helpers.convertTime(hour.dt),
      icon: hour.weather[0].icon,
      temp: Math.round(hour.temp),
    }));
    currentForecast = Forecast(
      data.name,
      data.lat,
      data.lon,
      current,
      daily,
      hourly
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
      populateInfo(dataOneCall);
      console.log(currentForecast);
    } catch (error) {
      console.log("s");
      throw error;
    }
  };

  const callCityAPI = async function (cityName, units) {
    let dataCurrent;
    try {
      const responseCurrent = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      dataCurrent = await responseCurrent.json();
      const responseAll = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCurrent.coord.lat}&lon=${dataCurrent.coord.lon}&exclude=minutely,alerts&units=${units}&appid=${KEY}`,
        {
          mode: "cors",
        }
      );
      const dataOneCall = await responseAll.json();
      dataOneCall.name = dataCurrent.name;

      populateInfo(dataOneCall);
    } catch (error) {
      console.log("s");
      throw error;
    }
  };
  const getCurrentForecast = () => currentForecast;

  return { getCurrentForecast, callCoordAPI, callCityAPI };
})();
export { ControllerAPI };
