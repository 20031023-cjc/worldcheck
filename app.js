import L from 'leaflet';
let currentLang = localStorage.getItem('language') || 'en';
const i18n = {
  title: { en: 'WorldView', zh: '世界视图', ja: 'ワールドビュー' },
  inputPlaceholder: { en: 'Enter city name', zh: '输入城市名称', ja: '都市名を入力' },
  // ... (其他多语言内容)
};

// 地图初始化
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([0, 0], 2);
  const tileLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  const tileDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png');
  tileLight.addTo(map);

  // 地图风格切换
  document.getElementById('map-style-switch').onclick = () => {
    if (map.hasLayer(tileLight)) {
      map.removeLayer(tileLight);
      tileDark.addTo(map);
    } else {
      map.removeLayer(tileDark);
      tileLight.addTo(map);
    }
  };

  // 粒子特效（雨/雪）
  function initParticles() {
    // TODO: 绘制 canvas 粒子特效
  }
  initParticles();

  // 搜索建议
  document.getElementById('search-input').addEventListener('input', async e => {
    // TODO: 获取城市联想并渲染到 #suggestions
  });

  // 语音播报
  function speak(text) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  // 天气展示 + 折线图 + 日出日落进度条
  async function showWeather(city) {
    // TODO: 调用 OpenWeatherMap API，渲染 #weather-front，
    // 使用 Chart.js 在 #weather-chart 绘制未来 5 天趋势折线图，
    // 计算日出/日落并设置 #sunlight-progress::after 宽度
  }

  // 文化信息展示
  async function showCulture(countryCode) {
    // TODO: 填充 #culture-front/back 内容
  }

  // 对比模式
  document.getElementById('compare-toggle').addEventListener('click', () => {
    document.getElementById('compare-container').classList.toggle('hidden');
  });

  // 收藏功能
  function loadFav() {
    const fav = JSON.parse(localStorage.getItem('favCities') || '[]');
    const ul = document.querySelector('#favourites ul');
    ul.innerHTML = '';
    fav.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      ul.appendChild(li);
    });
  }
  function toggleFav(city) {
    let fav = JSON.parse(localStorage.getItem('favCities') || '[]');
    const idx = fav.indexOf(city);
    if (idx > -1) fav.splice(idx, 1);
    else fav.push(city);
    localStorage.setItem('favCities', JSON.stringify(fav));
    loadFav();
  }
  loadFav();

  // 分享功能
  document.getElementById('share-btn').addEventListener('click', () => {
    html2canvas(document.getElementById('info-container')).then(canvas => {
      canvas.toBlob(blob => saveAs(blob, 'worldview.png'));
    });
  });

  // 主题切换
  document.getElementById('theme-switch').onclick = () => {
    document.body.classList.toggle('dark');
  };

  // 3D 地球
  function initGlobe() {
    // TODO: three.js 场景, 地球, 控件
  }
  initGlobe();

  // 实时空气质量
  async function showAQI(lat, lon) {
    // TODO: 调用 AQI API 并展示
  }

  // 推送提醒
  if (Notification.permission === 'default') Notification.requestPermission();
  function notifyWeather(city, condition) {
    if (Notification.permission === 'granted') {
      new Notification(`Weather Alert in ${city}`, { body: condition });
    }
  }

  // 隐藏加载动画
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
  }, 500);
});
