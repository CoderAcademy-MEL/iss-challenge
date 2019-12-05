const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

const showMap = () => {
  const map = L.map('mapid').setView([0, 0], 1);
  // Making a map and tiles
  const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(map);
  return map
}

const issIcon = L.icon({
  iconUrl: 'iss200.png',
  iconSize: [50, 50],
  iconAnchor: [25, 16]
})

const updateISSMarker = (lat, long) => {
  marker.setLatLng(lat, long)
}

async function getISSData() {
  
  const response = await fetch(api_url);
  // console.log(response)
  const data = await response.json();
  
  // Object destructuring
  const {latitude, longitude} = data;
  
  console.log(latitude, longitude)
  
  document.querySelector('#lat').innerText = latitude;
  document.querySelector('#lon').innerText = longitude;
  
  map.setView([latitude, longitude]);
  // map.getZoom();
  updateISSMarker([latitude, longitude]);
}

const map = showMap();
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);
setInterval(getISSData, 2000);
    