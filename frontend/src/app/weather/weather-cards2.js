import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import "./weather.css";

function WeatherCards2() {
    const [weatherData, setWeatherData] = useState([]);
    const [hideMoreDetails, setHideMoreDetails] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3500/data')
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the weather data: ", error);
            });
    }, []);  // The empty dependency array ensures that this effect runs only once on mount, akin to `componentDidMount`

    return (
        <div>
            <div className="weather-cards">
                {weatherData.map(weather => (
                    <Card key={weather.id} weather={weather} hide={hideMoreDetails} />
                ))}
            </div>
        </div>
    );
}

export default WeatherCards2;

// Imported the necessary Hooks: useState and useEffect.
// Utilized useState to manage the component state.
// Employed useEffect to handle logic after the component mounts, analogous to componentDidMount.
// Directly returned the JSX without the need for a render method