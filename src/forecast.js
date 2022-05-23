const Forecast = function (name, lat, lon, current, daily) {
  return {
    name,
    lat,
    lon,
    current,
    daily,
  };
};
export { Forecast };
