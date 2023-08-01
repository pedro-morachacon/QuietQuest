// Sidebar component to contain non map display items
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import FirebaseUserName from "@/app/components/FirebaseUserName";
import StartSearchField from "@/app/components/StartSearchField";
import EndSearchField from "@/app/components/EndSearchField";
import CurrentLocation from "@/app/components/CurrentLocation";
import Datetimepicker from "./Datepicker";
import RoutingStatus from "@/app/components/RoutingStatus";
import RoutingLegend from "@/app/components/RoutingLegend";
import Instructions from "@/app/components/Instructions";

export const Sidebar = ({
  setStartLocation,
  setCurrentLocation,
  setEndLocation,
  setDate,
  setTime,
  routingClick,
  routingStatus,
  optimalInstructionsData,
  avoidanceInstructionsData,
  currentLocation
}) => (
  <div className="container">
    <BrowserRouter>
      <a href="/" className={"logo"}>
        <img
          src="https://imagizer.imageshack.com/img924/9498/pk6w5C.png"
          alt=" "
          width="200"
          height="200"
        />
      </a>

      <div className={"user-image"}>
        <FirebaseUserName />
      </div>

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
    </BrowserRouter>
  </div>
);
