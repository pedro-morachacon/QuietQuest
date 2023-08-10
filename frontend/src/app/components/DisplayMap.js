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
import RoutingRadioButtons from "@/app/components/RoutingRadioButtons";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import SavedRoutes from "@/app/components/SavedRoutes";
import SavedLinks from "@/app/components/SavedLinks";
import L from "leaflet";

export const startPosIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" ><path d="M480-362.391q56 0 101-27.5t71-72.5q-35-29-79-44.5t-93-15.5q-49 0-93 15.5t-79 44.5q26 45 71 72.5t101 27.5Zm0-200q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0 490.522Q315.174-211.261 233.522-329.36q-81.653-118.097-81.653-223.598 0-153.28 98.952-244.227T480-888.131q130.227 0 229.179 90.947t98.952 244.227q0 105.501-81.653 223.598Q644.826-211.261 480-71.869Z" fill="#ffffff"/></svg>
`,
  className: "svg-icon",
});

export const endPosIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" ><path d="M362.63-722.152h81.435v-81.435H362.63v81.435Zm162.87 0v-81.435h81.435v81.435H525.5ZM362.63-396.413v-81.435h81.435v81.435H362.63Zm325.74-162.87v-81.434h81.435v81.434H688.37Zm0 162.87v-81.435h81.435v81.435H688.37Zm-162.87 0v-81.435h81.435v81.435H525.5Zm162.87-325.739v-81.435h81.435v81.435H688.37Zm-244.305 81.435v-81.435H525.5v81.435h-81.435Zm-253.87 488.13v-651h91.001v81.435h81.434v81.435h-81.434v81.434h81.434v81.435h-81.434v325.261h-91.001Zm416.74-325.261v-81.435h81.435v81.435h-81.435Zm-162.87 0v-81.435H525.5v81.435h-81.435Zm-81.435-81.435v-81.434h81.435v81.434H362.63Zm162.87 0v-81.434h81.435v81.434H525.5Zm81.435-81.434v-81.435h81.435v81.435h-81.435Z" fill="#ffffff"/></svg>
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
  const [avoidanceInstructionsData, setAvoidanceInstructionsData] = useState(null);
  const [routingStatus, setRoutingStatus] = useState(null);

  const [startMarkerPosition, setStartMarkerPosition] = useState(null);
  const [endMarkerPosition, setEndMarkerPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [savedRouteAddress, setSavedRouteAddress] = useState("");
  const [selectedRadioButton, setSelectedRadioButton] = useState("both");

  const [sidebarStatus, setSidebarStatus] = useState("closed_sidebar");
  const [activeSidebarOption, setActiveSidebarOption] = useState("");

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
      map.flyTo([startLocation[0], startLocation[1]], 14);
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
    document.getElementById("loading-circle").style.display = "block";
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
          tab: selectedRadioButton, //changes route dependent on active tab
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
          document.getElementById("journey_fields").style.display = "none";
          document.getElementById("instructions_ls").style.display = "block";
          document.getElementById("loading-circle").style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Apologies! An Unforeseen Error Has Occurred, Please Try Creating A QuietQuest Again Later. " +
              "Our Team of Wise Sages Have Been Notified And Will Endeavour To Work Their Mystical Magic!");
        });
    } else {
      alert("Please Start Location and Destination Information Before Requesting a QuietQuest");
    }
  };

  const [heatmapData, setHeatmapData] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const noiseHeatmapClick = () => {
    document.getElementById("loading-circle").style.display = "block";
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
        document.getElementById("loading-circle").style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching login data:", error);
      });
  };

  const busynessHeatmapClick = () => {
    document.getElementById("loading-circle").style.display = "block";
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
        document.getElementById("loading-circle").style.display = "none";
      })
      .catch((error) => {
        console.error("Error fetching login data:", error);
      });
  };

  const combinedHeatmapClick = () => {
    document.getElementById("loading-circle").style.display = "block";
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
        document.getElementById("loading-circle").style.display = "none";
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

  useEffect(() => {
    switch (sidebarStatus) {
      case "closed_sidebar":
        document.getElementById("closed_btn_icons").style.display = "block";
        document.getElementById("open_sidebar").style.display = "none";
        break;
      case "open_sidebar":
        document.getElementById("closed_btn_icons").style.display = "none";
        document.getElementById("open_sidebar").style.display = "block";

        break;
    }
  }, [sidebarStatus]);

  const toggleSidebarStatus = (sidebarStatus) => {
    setSidebarStatus(sidebarStatus);
  };

  useEffect(() => {
    switch (activeSidebarOption) {
      case "journey_planner":
        document.getElementById("journey_fields").style.display = "block";
        document.getElementById("destination_list").style.display = "none";
        document.getElementById("saved_list").style.display = "none";
        document.getElementById("instructions_ls").style.display = "none";
        break;
      case "destinations":
        document.getElementById("journey_fields").style.display = "none";
        document.getElementById("destination_list").style.display = "block";
        document.getElementById("saved_list").style.display = "none";
        document.getElementById("instructions_ls").style.display = "none";
        break;
      case "saved_list":
        document.getElementById("journey_fields").style.display = "none";
        document.getElementById("destination_list").style.display = "none";
        document.getElementById("saved_list").style.display = "block";
        document.getElementById("instructions_ls").style.display = "none";
        break;
      case "instructions_ls":
        document.getElementById("journey_fields").style.display = "none";
        document.getElementById("destination_list").style.display = "none";
        document.getElementById("saved_list").style.display = "none";
        document.getElementById("instructions_ls").style.display = "block";
        break;
      case "none":
        // Hide both components
        document.getElementById("journey_fields").style.display = "none";
        document.getElementById("destination_list").style.display = "none";
        document.getElementById("saved_list").style.display = "none";
        document.getElementById("instructions_ls").style.display = "none";
        break;
      default:
        break;
    }
  }, [activeSidebarOption]);

  // Function to toggle the active tab
  const toggleSidebarOptionTab = (sidebarOptionTab) => {
    setActiveSidebarOption(sidebarOptionTab);
  };

  const feedbackbutton = () => {
    window.location.href = "./feedback";
  };

  useEffect(() => {
    setActiveSidebarOption("journey_planner");
  }, [endLocation]);

  return (
    <div>
      <BrowserRouter>
        <div id="sidebar_map">
          <div id="item-left">
            <button
              onClick={() => toggleSidebarStatus("open_sidebar")}
              id="closed_btn_icons"
              style={{
                display: sidebarStatus === "closed_sidebar" ? "block" : "none",
              }}
            >
              <div id="closed_icons">
                <div id="closed_top_icons">




                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -733 960 960"
                    width="28"
                  >
                    <path
                      d="M157.37-228.282q-19.153 0-32.327-13.174t-13.174-32.326q0-19.153 13.174-32.327t32.327-13.174h645.26q19.153 0 32.327 13.174t13.174 32.327q0 19.152-13.174 32.326t-32.327 13.174H157.37Zm0-206.218q-19.153 0-32.327-13.174T111.869-480q0-19.152 13.174-32.326T157.37-525.5h645.26q19.153 0 32.327 13.174T848.131-480q0 19.152-13.174 32.326T802.63-434.5H157.37Zm0-206.217q-19.153 0-32.327-13.174t-13.174-32.327q0-19.152 13.174-32.326t32.327-13.174h645.26q19.153 0 32.327 13.174t13.174 32.326q0 19.153-13.174 32.327t-32.327 13.174H157.37Z"
                      fill="#394B56"
                    />
                  </svg>

                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="30" height="24" viewBox="0 0 500.000000 400.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M585 3705 c-158 -29 -280 -92 -390 -200 -81 -79 -145 -192 -165 -292
-15 -72 -8 -203 14 -267 21 -58 321 -618 508 -945 190 -335 176 -336 380 26
251 443 477 871 499 945 18 58 21 88 17 172 -4 96 -7 108 -48 192 -132 273
-481 431 -815 369z m302 -363 c102 -53 155 -133 155 -233 0 -73 -22 -118 -84
-174 -156 -140 -424 -96 -508 82 -18 38 -21 60 -18 115 5 84 39 138 118 186
77 46 102 52 205 49 69 -3 100 -8 132 -25z" fill="#394B56"/>
<path d="M4085 2525 c-158 -29 -280 -92 -390 -200 -81 -79 -145 -192 -165
-292 -15 -72 -8 -203 14 -267 21 -58 321 -618 508 -945 190 -335 176 -336 380
26 251 443 477 871 499 945 18 58 21 88 17 172 -4 96 -7 108 -48 192 -132 273
-481 431 -815 369z m302 -363 c102 -53 155 -133 155 -233 0 -73 -22 -118 -84
-174 -156 -140 -424 -96 -508 82 -18 38 -21 60 -18 115 5 84 39 138 118 186
77 46 102 52 205 49 69 -3 100 -8 132 -25z" fill="#394B56"/>
<path d="M737 1379 c-3 -74 -5 -134 -4 -135 1 -1 171 -9 377 -18 965 -42 1788
-96 1904 -125 30 -7 42 -5 -784 -177 -566 -118 -769 -176 -860 -246 -39 -30
-70 -89 -70 -131 0 -123 124 -197 440 -260 366 -74 930 -133 2370 -245 64 -5
107 -5 111 1 7 10 23 246 17 252 -2 3 -206 20 -453 40 -876 69 -1412 122
-1740 171 -221 33 -254 39 -235 47 32 14 284 70 735 162 714 147 938 208 1014
278 27 25 60 92 61 121 0 36 -40 101 -79 128 -164 116 -786 181 -2356 248
-132 5 -285 12 -341 16 l-101 6 -6 -133z" fill="#394B56"/>
</g>
</svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path
                      d="M480-440q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 368.13q-84.913 0-159.345-32.117-74.432-32.118-129.491-87.177-55.059-55.059-87.177-129.491Q71.869-395.087 71.869-480t32.118-159.345q32.118-74.432 87.177-129.491 55.059-55.059 129.491-87.177Q395.087-888.131 480-888.131t159.345 32.118q74.432 32.118 129.491 87.177 55.059 55.059 87.177 129.491Q888.131-564.913 888.131-480t-32.118 159.345q-32.118 74.432-87.177 129.491-55.059 55.059-129.491 87.177Q564.913-71.869 480-71.869Zm0-91q133.043 0 225.087-92.043Q797.13-346.957 797.13-480t-92.043-225.087Q613.043-797.13 480-797.13t-225.087 92.043Q162.87-613.043 162.87-480t92.043 225.087Q346.957-162.87 480-162.87ZM480-480ZM297.717-277.957l248.805-112.456q7.435-3.478 13.511-9.554 6.076-6.076 9.554-13.511l112.456-248.805q4.761-9.76-2.619-17.141-7.381-7.38-17.141-2.619L413.478-569.587q-7.435 3.478-13.511 9.554-6.076 6.076-9.554 13.511L277.957-297.717q-4.761 9.76 2.619 17.141 7.381 7.38 17.141 2.619Z"
                      fill="#394B56"
                    />
                  </svg>

                  {/*Direction*/}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="30"
                  >
                    <path
                      d="M479.761-139.826q-16.152 0-32.446-5.837-16.293-5.837-28.967-18.272l-69.479-63.478q-105.521-96.283-191.26-192.62Q71.869-516.37 71.869-634q0-97.576 65.153-162.973 65.152-65.397 162.739-65.397 52.522 0 99.282 21.424 46.761 21.424 80.718 59.467 33.956-38.043 80.717-59.467 46.761-21.424 99.283-21.424 97.678 0 163.143 65.397Q888.37-731.576 888.37-634q0 117.63-85.598 214.467-85.598 96.837-193.12 193.359l-68.239 62.478q-12.674 12.435-29.087 18.153-16.413 5.717-32.565 5.717Zm-39.674-548.978q-27.565-39.566-60.924-61.066-33.359-21.5-79.337-21.5-58.696 0-97.826 39.164-39.13 39.163-39.13 98.206 0 51.541 36.64 109.524 36.641 57.983 87.64 112.497 51 54.514 104.971 102.09 53.97 47.576 87.64 78.302 33.761-31 87.83-78.554 54.07-47.554 105.163-102.044 51.094-54.489 87.855-112.272Q797.37-582.239 797.37-634q0-59.043-39.284-98.206-39.284-39.164-98.21-39.164-46.159 0-79.398 21.5t-60.804 61.066q-7.31 10.717-17.753 16.076-10.443 5.358-22.16 5.358-11.718 0-22.072-5.358-10.354-5.359-17.602-16.076ZM480-501.478Z"
                      fill="#394B56"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="30"
                  >
                    <path
                      d="M479.761-139.826q-16.152 0-32.446-5.837-16.293-5.837-28.967-18.272l-69.479-63.478q-105.521-96.283-191.26-192.62Q71.869-516.37 71.869-634q0-97.576 65.153-162.973 65.152-65.397 162.739-65.397 52.522 0 99.282 21.424 46.761 21.424 80.718 59.467 33.956-38.043 80.717-59.467 46.761-21.424 99.283-21.424 97.678 0 163.143 65.397Q888.37-731.576 888.37-634q0 117.63-85.598 214.467-85.598 96.837-193.12 193.359l-68.239 62.478q-12.674 12.435-29.087 18.153-16.413 5.717-32.565 5.717Zm-39.674-548.978q-27.565-39.566-60.924-61.066-33.359-21.5-79.337-21.5-58.696 0-97.826 39.164-39.13 39.163-39.13 98.206 0 51.541 36.64 109.524 36.641 57.983 87.64 112.497 51 54.514 104.971 102.09 53.97 47.576 87.64 78.302 33.761-31 87.83-78.554 54.07-47.554 105.163-102.044 51.094-54.489 87.855-112.272Q797.37-582.239 797.37-634q0-59.043-39.284-98.206-39.284-39.164-98.21-39.164-46.159 0-79.398 21.5t-60.804 61.066q-7.31 10.717-17.753 16.076-10.443 5.358-22.16 5.358-11.718 0-22.072-5.358-10.354-5.359-17.602-16.076ZM480-501.478Z"
                      fill="#394B56"
                    />
                  </svg>

                  <svg
                    width="28px"
                    height="28px"
                    viewBox="-3 0 26 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"
                      fill="#394B56"
                    />
                  </svg>
                </div>
                <div id="closed_bottom_icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path
                      d="M798.478-111.869q-126.458 0-249.881-55.098T323.739-323.38Q222.304-424.696 167.206-548.198 112.109-671.7 112.109-798.239q0-21.382 14.186-35.637 14.186-14.255 35.466-14.255h161.761q19.5 0 33.369 11.533 13.87 11.533 17.305 29.555l25.761 134.978q2.956 19.587-.881 33.217-3.837 13.631-14.706 23.783l-98.435 96.087q19.043 34.369 45.109 66.956 26.065 32.587 58.108 63.631 29.805 29.804 61.413 54.63 31.609 24.826 66.261 44.913l95.674-94.957q11.63-11.391 28.522-16.369 16.891-4.978 34.478-2.022l131.543 27.283q19.022 5.434 30.055 18.445 11.033 13.011 11.033 31.033v163.674q0 21.382-14.272 35.637-14.272 14.255-35.381 14.255ZM242.435-603.826l65.761-63.848-16.522-89.456h-87.326q4.522 39.326 13.153 77.638 8.631 38.312 24.934 75.666ZM601.391-244.63q37.566 16.282 76.75 26.043 39.185 9.761 78.989 13.239v-86.804l-89.217-18.522-66.522 66.044ZM242.435-603.826ZM601.391-244.63Z"
                      fill="#394B56"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path
                      d="M618.087-518.087q25.956 0 43.935-17.978Q680-554.043 680-580t-17.978-43.935q-17.979-17.978-43.816-17.978-25.836 0-43.815 18.041-17.978 18.042-17.978 43.816 0 25.773 17.988 43.871 17.988 18.098 43.686 18.098Zm-276.293 0q25.836 0 43.815-18.041 17.978-18.042 17.978-43.816 0-25.773-17.988-43.871-17.988-18.098-43.686-18.098-25.956 0-43.935 17.978Q280-605.957 280-580t17.978 43.935q17.979 17.978 43.816 17.978ZM479.98-71.869q-84.654 0-159.089-32.098t-129.63-87.294q-55.196-55.195-87.294-129.65-32.098-74.455-32.098-159.109 0-84.654 32.098-159.089t87.294-129.63q55.195-55.196 129.65-87.294 74.455-32.098 159.109-32.098 84.654 0 159.089 32.098t129.63 87.294q55.196 55.195 87.294 129.65 32.098 74.455 32.098 159.109 0 84.654-32.098 159.089t-87.294 129.63q-55.195 55.196-129.65 87.294-74.455 32.098-159.109 32.098ZM480-480Zm0 317.13q132.565 0 224.848-92.282Q797.13-347.435 797.13-480t-92.282-224.848Q612.565-797.13 480-797.13t-224.848 92.282Q162.87-612.565 162.87-480t92.282 224.848Q347.435-162.87 480-162.87Zm0-97.13q58.622 0 108.148-28.598 49.526-28.598 79.287-77.554 6-12.478-1.18-24.598-7.179-12.12-21.538-12.12H315.283q-14.359 0-21.538 12-7.18 12-1.18 24.479 29.761 48.956 79.62 77.674Q422.043-260 480-260Z"
                      fill="#394B56"
                    />
                  </svg>
                </div>
              </div>
              <div id="mobile_menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  viewBox="0 -960 960 960"
                  width="28"
                >
                  <path
                    d="M280-111.869q-19.152 0-32.326-13.174T234.5-157.37q0-19.152 13.174-32.326T280-202.87h400q19.152 0 32.326 13.174T725.5-157.37q0 19.153-13.174 32.327T680-111.869H280Z"
                    fill="#394B56"
                  />
                </svg>
              </div>
            </button>

            <div
              id="open_sidebar"
              style={{
                display: sidebarStatus === "open_sidebar" ? "block" : "none",
              }}
            >
              <div id="open_icons">
                <div id="open_top_icons">
                  <button
                    id="open_menu"
                    onClick={() => toggleSidebarStatus("closed_sidebar")}
                  >
                    <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -733 960 960"
                      width="24"
                    >
                      <path
                        d="M157.37-228.282q-19.153 0-32.327-13.174t-13.174-32.326q0-19.153 13.174-32.327t32.327-13.174h645.26q19.153 0 32.327 13.174t13.174 32.327q0 19.152-13.174 32.326t-32.327 13.174H157.37Zm0-206.218q-19.153 0-32.327-13.174T111.869-480q0-19.152 13.174-32.326T157.37-525.5h645.26q19.153 0 32.327 13.174T848.131-480q0 19.152-13.174 32.326T802.63-434.5H157.37Zm0-206.217q-19.153 0-32.327-13.174t-13.174-32.327q0-19.152 13.174-32.326t32.327-13.174h645.26q19.153 0 32.327 13.174t13.174 32.326q0 19.153-13.174 32.327t-32.327 13.174H157.37Z"
                        fill="#394B56"
                      />
                    </svg>
                    </div>
                  </button>
                  <div id="journey_title">
                    
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="30" height="24" viewBox="0 0 500.000000 400.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M585 3705 c-158 -29 -280 -92 -390 -200 -81 -79 -145 -192 -165 -292
-15 -72 -8 -203 14 -267 21 -58 321 -618 508 -945 190 -335 176 -336 380 26
251 443 477 871 499 945 18 58 21 88 17 172 -4 96 -7 108 -48 192 -132 273
-481 431 -815 369z m302 -363 c102 -53 155 -133 155 -233 0 -73 -22 -118 -84
-174 -156 -140 -424 -96 -508 82 -18 38 -21 60 -18 115 5 84 39 138 118 186
77 46 102 52 205 49 69 -3 100 -8 132 -25z" fill="#394B56"/>
<path d="M4085 2525 c-158 -29 -280 -92 -390 -200 -81 -79 -145 -192 -165
-292 -15 -72 -8 -203 14 -267 21 -58 321 -618 508 -945 190 -335 176 -336 380
26 251 443 477 871 499 945 18 58 21 88 17 172 -4 96 -7 108 -48 192 -132 273
-481 431 -815 369z m302 -363 c102 -53 155 -133 155 -233 0 -73 -22 -118 -84
-174 -156 -140 -424 -96 -508 82 -18 38 -21 60 -18 115 5 84 39 138 118 186
77 46 102 52 205 49 69 -3 100 -8 132 -25z" fill="#394B56"/>
<path d="M737 1379 c-3 -74 -5 -134 -4 -135 1 -1 171 -9 377 -18 965 -42 1788
-96 1904 -125 30 -7 42 -5 -784 -177 -566 -118 -769 -176 -860 -246 -39 -30
-70 -89 -70 -131 0 -123 124 -197 440 -260 366 -74 930 -133 2370 -245 64 -5
107 -5 111 1 7 10 23 246 17 252 -2 3 -206 20 -453 40 -876 69 -1412 122
-1740 171 -221 33 -254 39 -235 47 32 14 284 70 735 162 714 147 938 208 1014
278 27 25 60 92 61 121 0 36 -40 101 -79 128 -164 116 -786 181 -2356 248
-132 5 -285 12 -341 16 l-101 6 -6 -133z" fill="#394B56"/>
</g>
</svg>
                    <div id="sidebar-button">
                      <button
                        onClick={() =>
                          toggleSidebarOptionTab("journey_planner")
                        }
                      >
                        Journey Planner
                      </button>
                    </div>
                  </div>

                  <div
                    id="journey_fields"
                    style={{
                      display:
                        activeSidebarOption === "journey_planner"
                          ? "block"
                          : "none",
                    }}
                  >
                    <div id="start_journey">
                      <StartSearchField
                        setStartLocation={setStartLocation}
                        currentLocation={currentLocation}
                      />
                      <CurrentLocation
                        setCurrentLocation={setCurrentLocation}
                        savedRouteAddress={savedRouteAddress}
                        startLocation={startLocation}
                      />
                    </div>
                    <EndSearchField
                      setEndLocation={setEndLocation}
                      setEndInputValue={setEndInputValue}
                      savedRouteAddress={savedRouteAddress}
                    />

                    <div id="date_picker">
                      <Datetimepicker setDate={setDate} setTime={setTime} />
                    </div>

                    <div id="radio_buttons">
                      <RoutingRadioButtons
                        selectedValue={selectedRadioButton}
                        setSelectedRadioButton={setSelectedRadioButton}
                      />
                    </div>

                    <div>
                      <button id="routing_button" onClick={routingClick}>
                        Search
                      </button>
                    </div>
                  </div>

                  {/*Direction button*/}
                   <div id="instructions_links">
                     <div id="instructions_title">
                     <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26"
                    viewBox="0 -960 960 960"
                    width="26"
                  >
                    <path
                      d="M480-440q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 368.13q-84.913 0-159.345-32.117-74.432-32.118-129.491-87.177-55.059-55.059-87.177-129.491Q71.869-395.087 71.869-480t32.118-159.345q32.118-74.432 87.177-129.491 55.059-55.059 129.491-87.177Q395.087-888.131 480-888.131t159.345 32.118q74.432 32.118 129.491 87.177 55.059 55.059 87.177 129.491Q888.131-564.913 888.131-480t-32.118 159.345q-32.118 74.432-87.177 129.491-55.059 55.059-129.491 87.177Q564.913-71.869 480-71.869Zm0-91q133.043 0 225.087-92.043Q797.13-346.957 797.13-480t-92.043-225.087Q613.043-797.13 480-797.13t-225.087 92.043Q162.87-613.043 162.87-480t92.043 225.087Q346.957-162.87 480-162.87ZM480-480ZM297.717-277.957l248.805-112.456q7.435-3.478 13.511-9.554 6.076-6.076 9.554-13.511l112.456-248.805q4.761-9.76-2.619-17.141-7.381-7.38-17.141-2.619L413.478-569.587q-7.435 3.478-13.511 9.554-6.076 6.076-9.554 13.511L277.957-297.717q-4.761 9.76 2.619 17.141 7.381 7.38 17.141 2.619Z"
                      fill="#394B56"
                    />
                  </svg>

                       <div id="sidebar-button">
                      <button
                        onClick={() =>
                          toggleSidebarOptionTab("instructions_ls")
                        }
                        // className="directions-button"
                      >
                        Directions
                      </button>
                         </div>
                     </div>

                      <div
                        id="instructions_ls"
                        style={{
                          display:
                            activeSidebarOption === "instructions_ls"
                              ? "block"
                              : "none",
                        }}
                      >
                        <style>{`
                        #instructions_ls svg {
                          fill: black;
                        }
                      `}</style>


                        {(optimalInstructionsData !== null ||
                          avoidanceInstructionsData !== null) && (
                          <div>
                            {/* Tab buttons */}
                            <div style={{ marginBottom: "0px" }}>
                              {optimalInstructionsData !== null && (
                                <button
                                  style={{
                                    marginRight: "10px",
                                    backgroundColor:
                                      activeTab2 === "Optimal" ? "active" : "",
                                  }}
                                  onClick={() => setActiveTab("Optimal")}
                                  className="optimal-button"
                                >
                                  Fastest Route
                                </button>
                              )}
                              {avoidanceInstructionsData !== null && (
                                <button
                                  style={{
                                    backgroundColor:
                                      activeTab2 === "Avoidance"
                                        ? "active"
                                        : "",
                                  }}
                                  onClick={() => setActiveTab("Avoidance")}
                                  className="avoidance-button"
                                >
                                  Quietest Route
                                </button>
                              )}
                            </div>

                            <div className="instructions-list-container">
                              {/* Instructions based on the active tab */}
                              {activeTab2 === "Optimal" &&
                                optimalInstructionsData !== null && (
                                  <div >
                                   
                                    <Instructions
                                      instructionsData={optimalInstructionsData}
                                    />
                                  </div>
                                )}
                            </div>
                            
                            <div className="instructions-list-container">
                              {activeTab2 === "Avoidance" &&
                                avoidanceInstructionsData !== null && (
                                  <div>
                                    
                                    <Instructions
                                      instructionsData={
                                        avoidanceInstructionsData
                                      }
                                    />
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        {routingStatus && (
                          <RoutingLegend routingStatus={routingStatus} />
                        )}
                      </div>
                    </div>



                  <div id="saved_routes">
                    <div id="saved_routes_title">
                      <svg
                        id="sidebar-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path
                          d="M479.761-139.826q-16.152 0-32.446-5.837-16.293-5.837-28.967-18.272l-69.479-63.478q-105.521-96.283-191.26-192.62Q71.869-516.37 71.869-634q0-97.576 65.153-162.973 65.152-65.397 162.739-65.397 52.522 0 99.282 21.424 46.761 21.424 80.718 59.467 33.956-38.043 80.717-59.467 46.761-21.424 99.283-21.424 97.678 0 163.143 65.397Q888.37-731.576 888.37-634q0 117.63-85.598 214.467-85.598 96.837-193.12 193.359l-68.239 62.478q-12.674 12.435-29.087 18.153-16.413 5.717-32.565 5.717Zm-39.674-548.978q-27.565-39.566-60.924-61.066-33.359-21.5-79.337-21.5-58.696 0-97.826 39.164-39.13 39.163-39.13 98.206 0 51.541 36.64 109.524 36.641 57.983 87.64 112.497 51 54.514 104.971 102.09 53.97 47.576 87.64 78.302 33.761-31 87.83-78.554 54.07-47.554 105.163-102.044 51.094-54.489 87.855-112.272Q797.37-582.239 797.37-634q0-59.043-39.284-98.206-39.284-39.164-98.21-39.164-46.159 0-79.398 21.5t-60.804 61.066q-7.31 10.717-17.753 16.076-10.443 5.358-22.16 5.358-11.718 0-22.072-5.358-10.354-5.359-17.602-16.076ZM480-501.478Z"
                          fill="#394B56"
                        />
                      </svg>

                      <div id="sidebar-button">
                        <button
                          onClick={() => toggleSidebarOptionTab("destinations")}
                        >
                          Saved Destinations
                        </button>
                      </div>
                    </div>

                    <div
                      id="destination_list"
                      style={{
                        display:
                          activeSidebarOption === "destinations"
                            ? "block"
                            : "none",
                      }}
                    >
                      <style>{`
                        #destination_list svg {
                          fill: black;
                       }
                      `}</style>

                      <SavedRoutes
                        endLocation={endLocation}
                        endInputValue={endInputValue}
                        setEndLocation={setEndLocation}
                        setSavedRouteAddress={setSavedRouteAddress}
                      />
                    </div>
                  </div>


                  <div id="saved_links">
                    <div id="saved_links_title">
                      <svg
                        width="26px"
                        height="26px"
                        viewBox="-3 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.46484 3.92349C4.79896 3.5739 4 4.05683 4 4.80888V19.1911C4 19.9432 4.79896 20.4261 5.46483 20.0765L19.1622 12.8854C19.8758 12.5108 19.8758 11.4892 19.1622 11.1146L5.46484 3.92349ZM2 4.80888C2 2.55271 4.3969 1.10395 6.39451 2.15269L20.0919 9.34382C22.2326 10.4677 22.2325 13.5324 20.0919 14.6562L6.3945 21.8473C4.39689 22.8961 2 21.4473 2 19.1911V4.80888Z"
                          fill="#394B56"
                        />
                      </svg>
                      <div id="sidebar-button">
                        <button
                          onClick={() => toggleSidebarOptionTab("saved_list")}
                        >
                          Peaceful Playlist
                        </button>
                      </div>
                    </div>


                    <div
                      id="saved_list"
                      style={{
                        display:
                          activeSidebarOption === "saved_list"
                            ? "block"
                            : "none",
                      }}
                    >
                      <style>{`
                        #saved_list svg {
                          fill: black;
                        }
                      `}</style>
                      <SavedLinks />
                    </div>
                  </div>


                </div>

                <div id="open_bottom_icons">
                  <a href="./contact" id="contact_us">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        d="M798.478-111.869q-126.458 0-249.881-55.098T323.739-323.38Q222.304-424.696 167.206-548.198 112.109-671.7 112.109-798.239q0-21.382 14.186-35.637 14.186-14.255 35.466-14.255h161.761q19.5 0 33.369 11.533 13.87 11.533 17.305 29.555l25.761 134.978q2.956 19.587-.881 33.217-3.837 13.631-14.706 23.783l-98.435 96.087q19.043 34.369 45.109 66.956 26.065 32.587 58.108 63.631 29.805 29.804 61.413 54.63 31.609 24.826 66.261 44.913l95.674-94.957q11.63-11.391 28.522-16.369 16.891-4.978 34.478-2.022l131.543 27.283q19.022 5.434 30.055 18.445 11.033 13.011 11.033 31.033v163.674q0 21.382-14.272 35.637-14.272 14.255-35.381 14.255ZM242.435-603.826l65.761-63.848-16.522-89.456h-87.326q4.522 39.326 13.153 77.638 8.631 38.312 24.934 75.666ZM601.391-244.63q37.566 16.282 76.75 26.043 39.185 9.761 78.989 13.239v-86.804l-89.217-18.522-66.522 66.044ZM242.435-603.826ZM601.391-244.63Z"
                        fill="#394B56"
                      />
                    </svg>
                    <div id="sidebar-button">
                      <button>Contact Us</button>
                    </div>
                  </a>

                  <a href="./feedback" id="feedback">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path
                        d="M618.087-518.087q25.956 0 43.935-17.978Q680-554.043 680-580t-17.978-43.935q-17.979-17.978-43.816-17.978-25.836 0-43.815 18.041-17.978 18.042-17.978 43.816 0 25.773 17.988 43.871 17.988 18.098 43.686 18.098Zm-276.293 0q25.836 0 43.815-18.041 17.978-18.042 17.978-43.816 0-25.773-17.988-43.871-17.988-18.098-43.686-18.098-25.956 0-43.935 17.978Q280-605.957 280-580t17.978 43.935q17.979 17.978 43.816 17.978ZM479.98-71.869q-84.654 0-159.089-32.098t-129.63-87.294q-55.196-55.195-87.294-129.65-32.098-74.455-32.098-159.109 0-84.654 32.098-159.089t87.294-129.63q55.195-55.196 129.65-87.294 74.455-32.098 159.109-32.098 84.654 0 159.089 32.098t129.63 87.294q55.196 55.195 87.294 129.65 32.098 74.455 32.098 159.109 0 84.654-32.098 159.089t-87.294 129.63q-55.195 55.196-129.65 87.294-74.455 32.098-159.109 32.098ZM480-480Zm0 317.13q132.565 0 224.848-92.282Q797.13-347.435 797.13-480t-92.282-224.848Q612.565-797.13 480-797.13t-224.848 92.282Q162.87-612.565 162.87-480t92.282 224.848Q347.435-162.87 480-162.87Zm0-97.13q58.622 0 108.148-28.598 49.526-28.598 79.287-77.554 6-12.478-1.18-24.598-7.179-12.12-21.538-12.12H315.283q-14.359 0-21.538 12-7.18 12-1.18 24.479 29.761 48.956 79.62 77.674Q422.043-260 480-260Z"
                        fill="#394B56"
                      />
                    </svg>
                    <div id="sidebar-button">
                      <button>Feedback</button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="item-right">
            <div id="map">
              <MapContainer
                center={[40.76657321777155, -73.9831392189498]}
                zoom={13}
              >
                <div id="loading-circle">
                  <img src="https://imagizer.imageshack.com/img922/5061/lwuydF.png" alt="" />
                </div>
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
                <GeoJSON data={Manhattan} style={setColor} />
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
                  <GeoJSON
                    data={avoidanceDirections}
                    color="white"
                    weight={5}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        </div>

        <div>
          {routingStatus && <RoutingStatus routingStatus={routingStatus} />}
        </div>

        {/*<div>*/}
        {/*    <iframe src="https://weather-app-live.netlify.app"></iframe>*/}
        {/*</div>*/}
      </BrowserRouter>
    </div>
  );
};

export default DisplayMap;
