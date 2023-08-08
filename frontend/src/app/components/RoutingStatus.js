import React from "react";
const RoutingStatus = ({ routingStatus }) => {
  if (routingStatus === "no_rerouting") {
    return (
      <div>
        <p>
          No Separate Route Was Necessary For This Journey. Best of Luck on Your
          Quiet Quest!
        </p>
        <br />
      </div>
    );
  } else if (routingStatus === "rerouting_success") {
    return (
      <div>
        <p>A QuietQuest Has Been Created. Best of Luck on Your Quiet Quest!</p>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Apologies! An Unforeseen Error Has Occurred, Please Try Creating A
          QuietQuest Again Later.
        </p>
        <p>
          Our Team of Wise Sages Have Been Notified And Will Endeavour To Work
          Their Mystical Magic!
        </p>
        <br />
      </div>
    );
  }
};

export default RoutingStatus;
