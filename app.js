// 🌐 WorldView App.js (Enhanced Version)
let currentLang = localStorage.getItem("language") || "en";

const i18n = {
  title: { en: "WorldView", zh: "世界视图", ja: "ワールドビュー" },
  inputPlaceholder: { en: "Enter city name", zh: "输入城市名称", ja: "都市名を入力" },
  search: { en: "Search", zh: "搜索", ja: "検索" },
  useLocation: { en: "📍 Use My Location", zh: "📍 使用当前位置", ja: "📍 現在地を使う" },
  weatherTitle: { en: "Weather in", zh: "天气：", ja: "天気：" },
  culturalInfo: { en: "Cultural Info", zh: "文化信息", ja: "文化情報" },
  languageLabel: { en: "Official Language(s):", zh: "官方语言：", ja: "公用語：" },
  food: { en: "Famous Food:", zh: "代表食物：", ja: "名物料理：" },
  greeting: { en: "Greeting:", zh: "打招呼方式：", ja: "挨拶：" },
  etiquette: { en: "Etiquette:", zh: "礼仪文化：", ja: "マナー：" }
};

function translateUI() {
  document.querySelector("h1").textContent = `🌌 ${i18n.title[currentLang]}`;
  document.getElementById("cityInput").placeholder = i18n.inputPlaceholder[currentLang];
  document.querySelector(".search-box button").innerHTML = `🔍 ${i18n.search[currentLang]}`;
  document.getElementById("useLocationBtn").innerHTML = `📍 ${i18n.useLocation[currentLang]}`;
}

document.querySelectorAll(".language-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("language", currentLang);
    translateUI();
  });
});

translateUI();

const map = L.map("map").setView([35.6895, 139.6917], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
}).addTo(map);

let marker;

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  fetchWeather(city);
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetchWeatherByCoords(latitude, longitude);
  });
}

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
    .then(res => res.json())
    .then(data => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      displayWeather(data);
      fetchCulture(data.sys.country);
      moveMap(lat, lon);
    });
}

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`)
    .then(res => res.json())
    .then(data => {
      displayWeather(data);
      fetchCulture(data.sys.country);
      moveMap(lat, lon);
    });
}

function moveMap(lat, lon) {
  map.setView([lat, lon], 8);
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map);
}

function displayWeather(data) {
  const container = document.getElementById("weatherInfo");
  container.innerHTML = `
    <h2>${i18n.weatherTitle[currentLang]} ${data.name}</h2>
    <p>🌡️ ${data.main.temp} °C</p>
    <p>☁️ ${data.weather[0].description}</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>📍 Lat: ${data.coord.lat.toFixed(2)}, Lon: ${data.coord.lon.toFixed(2)}</p>
  `;
}

function fetchCulture(countryCode) {
  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(res => res.json())
    .then(data => {
      const country = data[0];
      const container = document.getElementById("cultureInfo");
      container.innerHTML = `
        <h3>${i18n.culturalInfo[currentLang]}</h3>
        <p><strong>${i18n.languageLabel[currentLang]}</strong> ${Object.values(country.languages || {}).join(", ")}</p>
        <p><strong>${i18n.food[currentLang]}</strong> 🍛 Example: Curry, Rice</p>
        <p><strong>${i18n.greeting[currentLang]}</strong> 🙌 Example: Handshake, Bow</p>
        <p><strong>${i18n.etiquette[currentLang]}</strong> 🎎 Example: Take off shoes indoors</p>
      `;
    });
}  

// 🌃 自动夜间切换（可选）
const hour = new Date().getHours();
if (hour >= 18 || hour < 6) {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}  
