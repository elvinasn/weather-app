const ControllerAPI = (() => {
  const KEY = "ec3ad567ee737d86887a91d6dd7a0000";

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
    } catch (error) {
      console.log("s");
      throw error;
    }
    return data;
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
    } catch (error) {
      console.log("s");
      throw error;
    }
    return data;
  };

  return { callCoordAPI, callCityAPI };
})();
export { ControllerAPI };
