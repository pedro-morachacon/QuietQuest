import ReactWeather from 'react-open-weather';
import {useOpenWeather} from "react-open-weather/src/js";

const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '51c75b0526916182f451f9674cc4f7a9',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};

export default Weather;
