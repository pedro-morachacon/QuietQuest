import React, { useState, useEffect } from 'react';

const RoutingStatus = ({ routingStatus }) => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [showPopup]);

  if (!showPopup) return null; // Don't render anything if popup is not shown

  let message = '';
  switch (routingStatus) {
    case "no_rerouting":
      message = "No separate route was necessary for this journey. Best of luck on your QuietQuest!";
      break;
    case "rerouting_success":
      message = "A QuietQuest has been created. Best of luck on your QuietQuest!";
      break;
    default:
      message = <>
        <p>Apologies! An unforeseen error has occurred, please try creating a QuietQuest again later.</p>
        <p>Our team of wise sages have been notified and will endeavour to work their mystical magic!</p>
      </>;
      break;
  }

  // Styling for a center popup
  const popupStyle = {
    position: 'fixed',
    top: '17%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#B8CBD6",
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    color: "#394B56",
  };

  return (
    <div style={popupStyle}>
      <p>{message}</p>
    </div>
  );
};

export default RoutingStatus;
