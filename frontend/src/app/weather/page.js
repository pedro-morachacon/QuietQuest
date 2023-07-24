"use client";
import React from "react";
import {ContactUs} from "@/app/contact/ContactUs";
// import "../firebase/firebase.css";
import WeatherCards from "@/app/weather/weather-cards";
import WeatherCards2 from "@/app/weather/weather-cards2";
import "./weather.css";

function App() {
  return (
    <div className="App">
        {/*<WeatherCards />*/}
        <WeatherCards2 />
    </div>
  );
}

export default App;
