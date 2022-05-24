const Forecast = function (name, lat, lon, current, daily, hourly) {
  return {
    name,
    lat,
    lon,
    current,
    daily,
    hourly,
  };
};
export { Forecast };
