import React, { useState, useEffect } from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import tileLayer from "./tileLayer";
import axios from "axios";
import Datetimepicker from "./Datepicker";
// import L from 'leaflet';
// import RoutingMachine from "@/app/components/RoutingMachine";
import CommunityDistricts from "../geojson/CommunityDistricts.json";
import HeatMap from "@/app/components/HeatMap";

import "../css/map.css";

import Instructions from "@/app/components/Instructions";
import RoutingStatus from "@/app/components/RoutingStatus";
import RoutingLegend from "@/app/components/RoutingLegend";

import FirebaseUserName from "@/app/components/FirebaseUserName";
import StartSearchField from "@/app/components/StartSearchField";
import EndSearchField from "@/app/components/EndSearchField";
import CurrentLocation from "@/app/components/CurrentLocation";
import ShowCurrentLocation from "@/app/components/ShowCurrentLocation";
import L from "leaflet";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Weather from "@/app/weather2/Weather";
import iconUrl from "./startRouteMarker.png";

export const startPosIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M480-362.391q56 0 101-27.5t71-72.5q-35-29-79-44.5t-93-15.5q-49 0-93 15.5t-79 44.5q26 45 71 72.5t101 27.5Zm0-200q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 490.522Q315.174-211.261 233.522-329.36q-81.653-118.097-81.653-223.598 0-153.28 98.952-244.227T480-888.131q130.227 0 229.179 90.947t98.952 244.227q0 105.501-81.653 223.598Q644.826-211.261 480-71.869Z"/></svg>
`,
  className: "svg-icon",
});

export const endPosIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 -960 960 960" width="35"><path d="M362.63-722.152h81.435v-81.435H362.63v81.435Zm162.87 0v-81.435h81.435v81.435H525.5ZM362.63-396.413v-81.435h81.435v81.435H362.63Zm325.74-162.87v-81.434h81.435v81.434H688.37Zm0 162.87v-81.435h81.435v81.435H688.37Zm-162.87 0v-81.435h81.435v81.435H525.5Zm162.87-325.739v-81.435h81.435v81.435H688.37Zm-244.305 81.435v-81.435H525.5v81.435h-81.435Zm-253.87 488.13v-651h91.001v81.435h81.434v81.435h-81.434v81.434h81.434v81.435h-81.434v325.261h-91.001Zm416.74-325.261v-81.435h81.435v81.435h-81.435Zm-162.87 0v-81.435H525.5v81.435h-81.435Zm-81.435-81.435v-81.434h81.435v81.434H362.63Zm162.87 0v-81.434h81.435v81.434H525.5Zm81.435-81.434v-81.435h81.435v81.435h-81.435Z"/></svg>
  `,
  className: "svg-icon",
});

const DisplayMap = ({ activeTab }) => {
  const setColor = ({ properties }) => {
    return { weight: 1 };
  };

  const [optimalDirections, setOptimalDirections] = useState(null);
  const [avoidanceDirections, setAvoidanceDirections] = useState(null);
  const [optimalInstructionsData, setOptimalInstructionsData] = useState(null);
  const [avoidanceInstructionsData, setAvoidanceInstructionsData] =
    useState(null);
  const [routingStatus, setRoutingStatus] = useState(null);

  const [startMarkerPosition, setStartMarkerPosition] = useState(null);
  const [endMarkerPosition, setEndMarkerPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (currentLocation) {
      setStartLocation([currentLocation.lng, currentLocation.lat]);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (startLocation) {
      setStartMarkerPosition({
        lng: startLocation[0],
        lat: startLocation[1],
      });
    }
  }, [startLocation]);

  useEffect(() => {
    if (endLocation) {
      setEndMarkerPosition({
        lng: endLocation[0],
        lat: endLocation[1],
      });
    }
  }, [endLocation]);

  // onclick, POST operation to backend django for api call
  const routingClick = () => {
    const startTimeRouting = Date.now(); // start time
    setOptimalDirections(null);
    setAvoidanceDirections(null);
    setOptimalInstructionsData(null);
    setAvoidanceInstructionsData(null);
    setRoutingStatus(null);

    if (startLocation && endLocation) {
      axios
        .post("http://localhost:8000/directions/", {
          // fixed locations values at the moment, should come from start and end points inputted into GeoSearch
          locations: [startLocation, endLocation],
          time: time, // time goes here e.g. "09:40:52"
          date: date, // date goes here e.g. "04/07/2023"
          tab: activeTab, //changes route dependent on active tab
        })
        .then((res) => {
          console.log(res.data);
          setOptimalDirections(res.data.optimal_directions);
          setAvoidanceDirections(res.data.avoidance_directions);
          setOptimalInstructionsData(
            res.data.optimal_directions.features[0].properties
          );
          if (res.data.avoidance_directions !== "") {
            setAvoidanceInstructionsData(
              res.data.avoidance_directions.features[0].properties
            );
          }
          setRoutingStatus(res.data.status);
          // Calculate Time
          const endTimeRouting = Date.now(); // end time
          const timeTaken = (endTimeRouting - startTimeRouting) / 1000; // time taken in seconds
          console.log(`Routing Time: ${timeTaken}'s`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [heatmapData, setHeatmapData] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const noiseHeatmapClick = () => {
    const startTimeNoise = Date.now();
    // gets noise login
    setHeatmapData(null); // Clear existing heatmap data
    setShowHeatmap(false);
    axios
      .post("http://localhost:8000/noiseheatmap/", {
        time: time, // time goes here e.g. "09:40:52"
        date: date, // date goes here e.g. "04/07/2023"
      })
      .then((res) => {
        setHeatmapData(res.data);
        setShowHeatmap(true);
        // Calculate Time
        const endTimeNoise = Date.now(); // end time
        const timeTaken = (endTimeNoise - startTimeNoise) / 1000; // time taken in seconds
        console.log(`Noise Time: ${timeTaken}'s`);
      })
      .catch((error) => {
        console.error("Error fetching login data:", error);
      });
  };

  const busynessHeatmapClick = () => {
    const startTimeTaxi = Date.now(); // end time
    setHeatmapData(null); // Clear existing heatmap data
    setShowHeatmap(false);
    // gets busyness heatmap
    axios
      .post("http://localhost:8000/busynessheatmap/", {
        time: time, // time goes here e.g. "09:40:52"
        date: date, // date goes here e.g. "04/07/2023"
      })
      .then((res) => {
        setHeatmapData(res.data);
        setShowHeatmap(true);
        // Calculate Time
        const endTimeTaxi = Date.now(); // end time
        const timeTaken = (endTimeTaxi - startTimeTaxi) / 1000; // time taken in seconds
        console.log(`Taxi Time: ${timeTaken}'s`);
      })
      .catch((error) => {
        console.error("Error fetching login data:", error);
      });
  };

  const combinedHeatmapClick = () => {
    const startTimeCombined = Date.now();
    // gets combined heatmap
    setHeatmapData(null); // Clear existing heatmap data
    setShowHeatmap(false);
    axios
      .post("http://localhost:8000/combinedheatmap/", {
        time: time, // time goes here e.g. "09:40:52"
        date: date, // date goes here e.g. "04/07/2023"
      })
      .then((res) => {
        setHeatmapData(res.data);
        setShowHeatmap(true);
        // Calculate Time
        const endTimeCombined = Date.now(); // end time
        const timeTaken = (endTimeCombined - startTimeCombined) / 1000; // time taken in seconds
        console.log(`Combined Time: ${timeTaken}'s`);
      })
      .catch((error) => {
        console.error("Error fetching heatmap data:", error);
      });
  };

  useEffect(() => {
    switch (activeTab) {
      case "noise":
        noiseHeatmapClick();
        break;
      case "crowds":
        busynessHeatmapClick();
        break;
      case "both":
        combinedHeatmapClick();
        break;
      case "map-only":
        setHeatmapData([]); // Indicate that heatmap layer should be removed
        break;

      default:
        break;
    }
  }, [activeTab, date, time]);

  const [activeTab2, setActiveTab] = useState("Optimal");

  return (
    <div className="container">
      <BrowserRouter>
        <div className="item-left">
          <a href="/" className="logo-journey">
            <img
              src="https://imagizer.imageshack.com/img922/9007/YYyyIi.png"
              alt=" "
              width="50"
              height="50"
            />
          </a>
          <div>
            <a href="http://localhost:3000/contact" className="journey">
              Journey Planner
            </a>
          </div>

          <div>
            <button className="button-onclick" onClick={routingClick}>
              Routing
            </button>
          </div>

          <div>
            {routingStatus && <RoutingLegend routingStatus={routingStatus} />}
          </div>

          <div className="routing" style={{ display: "flex" }}>
            <div style={{ paddingBottom: "10px" }}>
              <StartSearchField
                setStartLocation={setStartLocation}
                currentLocation={currentLocation}
              />
              <EndSearchField setEndLocation={setEndLocation} />
            </div>
            {/*<div>*/}
            {/*  <CurrentLocation setCurrentLocation={setCurrentLocation} />*/}
            {/*</div>*/}
          </div>

          <div className="button-onclick2">
            <CurrentLocation setCurrentLocation={setCurrentLocation} />
          </div>

          <div className="datetimepicker" id="datepicker">
            <Datetimepicker setDate={setDate} setTime={setTime} />
          </div>

          <a href="/" className="logo-phone">
            <img
              src="https://imagizer.imageshack.com/img924/4390/Zm4dCd.png"
              alt=" "
              width="50"
              height="50"
            />
          </a>

          <div>
            <a href="http://localhost:3000/contact" className="contact">
              Contact Us
            </a>
          </div>

          <a href="/" className="logo-feedback">
            <img
              src="https://imagizer.imageshack.com/img924/1066/lJPbyv.png"
              alt=" "
              width="40"
              height="40"
            />
          </a>

          <div>
            <a href="http://localhost:3000/feedback" className="feedback">
              Feedback
            </a>
          </div>
        </div>

        <div className="item-right">
          <div id="map">
            <MapContainer
              center={[40.76657321777155, -73.9831392189498]}
              zoom={12}
            >
              {/* Display start marker */}
              {startMarkerPosition && (
                <Marker position={startMarkerPosition} icon={startPosIcon}>
                  <Popup>Start Location</Popup>
                </Marker>
              )}

              {/* Display end marker */}
              {endMarkerPosition && (
                <Marker position={endMarkerPosition} icon={endPosIcon}>
                  <Popup>End Location</Popup>
                </Marker>
              )}

              {/* Display currentLocation marker */}
              {currentLocation && (
                <ShowCurrentLocation currentLocation={currentLocation} />
              )}
              <TileLayer {...tileLayer} />
              {/*<Routing setLocation={setLocation}/>*/}
              {/*<Routing2 setLocation={setLocation} />*/}
              <GeoJSON data={CommunityDistricts} style={setColor} />
              {/*<LocateUserControl />*/}
              <HeatMap heatmapData={heatmapData} />
              {/*<Marker position={[52.136096, 11.635208]} icon={myIcon}>*/}
              {/*    <Popup>*/}
              {/*      52.136096, 11.635208*/}
              {/*    </Popup>*/}
              {/*</Marker>*/}
              {/* displays optimal route */}
              {optimalDirections && (
                <GeoJSON data={optimalDirections} color="purple" weight={5} />
              )}
              {/* displays route avoiding polygons*/}
              {avoidanceDirections && (
                <GeoJSON data={avoidanceDirections} color="white" weight={5} />
              )}
            </MapContainer>
          </div>
          <div>
            {routingStatus && <RoutingStatus routingStatus={routingStatus} />}
          </div>

          <div>
            {/* Tab buttons */}
            <div style={{ marginBottom: "10px" }}>
              <button
                style={{
                  marginRight: "10px",
                  backgroundColor: activeTab2 === "Optimal" ? "#ddd" : "",
                }}
                onClick={() => setActiveTab("Optimal")}
              >
                Optimal Instructions
              </button>
              <button
                style={{
                  backgroundColor: activeTab2 === "Avoidance" ? "#ddd" : "",
                }}
                onClick={() => setActiveTab("Avoidance")}
              >
                Avoidance Instructions
              </button>
            </div>

            {/* Instructions based on the active tab */}
            {activeTab2 === "Optimal" && optimalInstructionsData !== null && (
              <div>
                <h2>Optimal Instructions:</h2>
                <Instructions instructionsData={optimalInstructionsData} />
              </div>
            )}

            {activeTab2 === "Avoidance" &&
              avoidanceInstructionsData !== null && (
                <div>
                  <h2>Avoidance Instructions:</h2>
                  <Instructions instructionsData={avoidanceInstructionsData} />
                </div>
              )}
          </div>

          <div className={"weather-icon"}>
            <Weather/>
          </div>


          {/*<div>*/}
          {/*    <iframe src="https://weather-app-live.netlify.app"></iframe>*/}
          {/*</div>*/}
          {/*<div className="weather-text">*/}
          {/*    <WeatherCards2 />*/}
          {/*</div>*/}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default DisplayMap;
