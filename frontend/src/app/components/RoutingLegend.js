import React from "react";

const RoutingStatus = ({ routingStatus }) => {
  if (routingStatus === "no_rerouting") {
    return (
      <div>
        <p style={{color: 'purple'}}>Purple - Quickest Route</p>
      </div>
    );
  } else if (routingStatus === "rerouting_success") {
    return (
      <div>
        <p style={{color: 'purple'}}>Purple - Quickest Route</p>
        <p style={{color: 'white'}}>White - QuietQuest</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }
};

export default RoutingStatus;
