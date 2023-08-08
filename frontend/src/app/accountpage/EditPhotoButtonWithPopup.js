import React, { useState } from "react";
import UpdatePhotoURL from "@/app/firebaseauth/UpdatePhotoURL";

function EditPhotoButtonWithPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Edit</button>

      {isPopupOpen && (
        <>
          {/* Overlay to darken the background */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={togglePopup}
          ></div>

          {/* The Popup for updating the photo URL */}
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
              zIndex: 1000,
            }}
          >
            <UpdatePhotoURL />
            <button onClick={togglePopup} style={{ marginTop: "10px" }}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditPhotoButtonWithPopup;
