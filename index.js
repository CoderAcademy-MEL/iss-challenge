const api_url = // fill in here


async function getISSData() {  
  const response = await fetch(api_url);
  // console.log(response)
  const data = // use response above to format to json (hint: use await also);
  
  
  const {latitude, longitude} =  // Use object destructuring to define latitude and longitude from data;
  
  console.log(latitude, longitude)
  
  // create two document elements (one for latitude and one for longitude) and use innerText to pass in values
  
  map.setView([latitude, longitude]);
  map.getZoom();
  
  // use your updateISSMarker function here eventually
}

const issIcon = L.icon({
  iconUrl: 'INSERT YOUR ICON HERE',
  iconSize: [50, 50],
  iconAnchor: [25, 16]
})

const updateISSMarker = (lat, long, marker) => {
  // update the marker position
}

const showMap = () => {
  const map = // initialize map object here
  // Making a map and tiles
  const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tiles = // use docs to figure out how to create tiles (hint: use L.tileLayer);
  tiles.addTo(map);
  L.marker([0, 0]).addTo(map);
}

// Final Steps: Call your showMap() and getISSData() functions

//showMap();
//getISSData()

// use setInterval to call your getISSData() function every 2000 ms
    