import React from "react";
const RoutingStatus = ({ routingStatus }) => {
  if (routingStatus === "no_rerouting") {
    return (

      <div id="routing_result_message">
        <p>This time the quickest route is also the quietest</p>
      </div>
    );
  } else if (routingStatus === "rerouting_success") {
    return (
      <div >
       {/*} <p>Purple - Quickest Route</p>
        <p>White - QuietQuest</p> */}
      </div>
    );
  } else {
    return (
      <div id="routing_result_message">
        <p>Error in rerouting</p>
      </div>
    );
  }
};

export default RoutingStatus;
