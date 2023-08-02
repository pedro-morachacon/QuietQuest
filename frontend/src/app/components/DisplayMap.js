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
import tileLayer from "./tileLayer";
import axios from "axios";
import Datetimepicker from "./Datepicker";
import Manhattan from "../geojson/manhattan.json";
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

const redIcon = L.icon({
  iconUrl:
    "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png",
  iconSize: [26, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const blueIcon = L.icon({
  iconUrl:
    "https://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/blue-pushpin.png",
  iconSize: [26, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
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
                <Marker position={startMarkerPosition} icon={redIcon}>
                  <Popup>Start Location</Popup>
                </Marker>
              )}

              {/* Display end marker */}
              {endMarkerPosition && (
                <Marker position={endMarkerPosition} icon={blueIcon}>
                  <Popup>End Location</Popup>
                </Marker>
              )}

              {/* Display currentLocation marker */}
              {currentLocation && (
                <ShowCurrentLocation currentLocation={currentLocation} />
              )}
              <TileLayer {...tileLayer} />
              <GeoJSON data={Manhattan} style={setColor} />
              {/*<LocateUserControl />*/}
              {showHeatmap && <HeatMap heatmapData={heatmapData} />}
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

          {/*<div>*/}
          {/*    <iframe src="https://weather-app-live.netlify.app"></iframe>*/}
          {/*</div>*/}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default DisplayMap;
