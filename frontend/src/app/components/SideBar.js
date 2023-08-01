// Sidebar component to contain non map display items
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import StartSearchField from "@/app/components/StartSearchField";
import EndSearchField from "@/app/components/EndSearchField";
import CurrentLocation from "@/app/components/CurrentLocation";
import Datetimepicker from "./Datepicker";
import RoutingStatus from "@/app/components/RoutingStatus";
import RoutingLegend from "@/app/components/RoutingLegend";
import Instructions from "@/app/components/Instructions";

const Sidebar = ({
  routingStatus,
  setStartLocation,
  currentLocation,
  setEndLocation,
  setCurrentLocation,
  setDate,
  setTime,
  optimalInstructionsData,
  avoidanceInstructionsData
 
}) => (
     

      <div className="sidebar">
       

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


        <div>
            {routingStatus && <RoutingStatus routingStatus={routingStatus} />}
          </div>
          <div>
            {optimalInstructionsData !== null && (
              <div>
                <h2>Optimal Instructions:</h2>
                <Instructions instructionsData={optimalInstructionsData} />
              </div>
            )}
          </div>
          <div>
            {avoidanceInstructionsData !== null && (
              <div>
                <br />
                <h2>Avoidance Instructions:</h2>
                <Instructions instructionsData={avoidanceInstructionsData} />
              </div>
            )}
          </div>

      </div>
);
export default Sidebar;