import { ControllerAPI } from "./ControllerAPI";
import { domMarkups } from "./domMarkups";
import { helpers } from "./helpers";
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const dom = (() => {
  const main = document.querySelector("main");
  const form = document.querySelector("form");
  const TOKEN =
    "pk.eyJ1IjoiZWxhczMzIiwiYSI6ImNsM2w5c3Q2ajBldTEzcnJzb2YzamFkMzUifQ.jKWnWv943CrDz63ZaQNJYg";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location");
    Clear();
    main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
    callByCity(location.value);
    location.value = "";
  });
  const Clear = () => {
    main.innerHTML = "";
  };
  const renderMap = () => {
    main.insertAdjacentHTML("beforeend", `<div id="map"></div>`);
    const forecast = ControllerAPI.getCurrentForecast();
    const coords = [forecast.lat, forecast.lon];
    const map = L.map("map").setView(coords, 13);
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${TOKEN}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: TOKEN,
      }
    ).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup(
        `${forecast.current.temp}°${
          localStorage.getItem("units") === "metric" ? "C" : "F"
        }. Click on map.`
      )
      .openPopup();

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      Clear();
      main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
      callByCoords(lat, lng);
    });
  };

  const insertForecast = () => {
    main.insertAdjacentHTML("beforeend", domMarkups.mainCard());
    main.insertAdjacentHTML("beforeend", domMarkups.dailyCard());
    main.insertAdjacentHTML("beforeend", domMarkups.hourlyCard());
    renderMap();
    const swiper = new Swiper(".mySwiper", {
      modules: [Navigation],
      slidesPerView: "auto",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    const swiper2 = new Swiper(".daily-card", {
      modules: [Navigation],
      slidesPerView: "auto",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };

  const callByCoords = async function (lat, lon) {
    if (
      await ControllerAPI.callCoordAPI(lat, lon, localStorage.getItem("units"))
    ) {
      insertForecast();
    } else {
      main.insertAdjacentHTML("beforeend", domMarkups.error());
    }
  };

  const callByCity = async function (city) {
    if (await ControllerAPI.callCityAPI(city, localStorage.getItem("units"))) {
      insertForecast();
    } else {
      main.insertAdjacentHTML("beforeend", domMarkups.error());
    }
  };

  const callByLocation = (location) => {
    callByCoords(location.coords.latitude, location.coords.longitude);
  };

  function errorCallback() {
    callByCity("Vilnius");
  }
  const init = () => {
    main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
    const check = document.querySelector("input[type=checkbox]");
    const value = localStorage.getItem("units");
    const currentBtn = document.getElementById("current");
    currentBtn.addEventListener("click", () => {
      Clear();
      main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
      navigator.geolocation.getCurrentPosition(callByLocation, errorCallback);
    });
    if (!value) {
      localStorage.setItem("units", "metric");
    } else {
      check.checked = value !== "metric";
    }
    check.addEventListener("change", () => {
      localStorage.setItem("units", check.checked ? "imperial" : "metric");
      Clear();
      main.insertAdjacentHTML("afterbegin", domMarkups.spinner());
      const current = ControllerAPI.getCurrentForecast();
      callByCoords(current.lat, current.lon);
    });
    /// IF NOT MOBILE USER
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callByLocation, errorCallback);
    } else {
      callByCity("Vilnius");
    }
  };

  return { init, Clear };
})();
export { dom };
