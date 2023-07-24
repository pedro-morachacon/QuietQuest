import React from 'react';

export default function Card(props) {

    function handleClick(){
        alert(props.weather.moreDetails);
    }


    return (
        <div className="card">
            <h3>{props.weather.weekDay}</h3>
            <small>{props.weather.date} {props.weather.year}</small>
            <img src={props.weather.url} alt="weather-image" />
            <h6>{props.weather.temperature} °C</h6>
            <small>{props.weather.tempInWords}</small>
            {/*<h5 onClick={handleClick} style={{ cursor: "pointer" }}>More Details</h5>*/}
        </div>
    );
}