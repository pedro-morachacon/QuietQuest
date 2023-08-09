import React from "react";
const RoutingStatus = ({ routingStatus }) => {
  if (routingStatus === "no_rerouting") {
    return (
      <div>
        <p>No separate route was necessary for this journey. Best of luck on your QuietQuest!</p><br/>
      </div>
    );
  } else if (routingStatus === "rerouting_success") {
    return (
      <div>
        <p>A QuietQuest has been created. Best of luck on your QuietQuest!</p><br/>
      </div>
    );
  } else {
    return (
      <div>
        <p>Apologies! An unforeseen error has occurred, please try creating a QuietQuest again later.</p>
        <p>Our team of wise sages have been notified and will endeavour to work their mystical magic!</p><br/>
      </div>
    );
  }
};

export default RoutingStatus;
