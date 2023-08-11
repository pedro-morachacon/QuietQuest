
const apiKey = process.env.REACT_APP_TILELAYER_API_KEY;

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  url: `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${apiKey}`
};

export default tileLayer;