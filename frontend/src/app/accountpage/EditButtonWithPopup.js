import React, { useState } from "react";
import DisplayNameSetter from "@/app/firebaseauth/DisplayNameSetter";

function EditNameWithPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Edit</button>

      {isPopupOpen && (
        <>
          {/* This is the overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
              zIndex: 999, // ensures it's above other content
            }}
            onClick={togglePopup}
          ></div>{" "}
          {/* clicking the overlay will close the popup */}
          {/* This is the popup */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "black",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              zIndex: 1000, // ensures popup is above the overlay
            }}
          >
            <DisplayNameSetter />
            <button onClick={togglePopup}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditNameWithPopup;
