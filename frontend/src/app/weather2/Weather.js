import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'b7d6a55bc0fff59fb0d5f7c3c1668417'; 

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Manhattan&units=metric&appid=${apiKey}`)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

    return (
        <div>
            <img src={iconUrl} alt="Weather icon" />
            {/*<p>{weatherData.weather[0].description}</p> */}
            <p>{weatherData.main.temp}°C</p>
        </div>
    );
}

export default Weather;
