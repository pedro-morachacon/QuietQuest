import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";

function FirebaseUserDetails() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const details = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid
      };

      setUserDetails(details);
    }
  }, []);

  return (
    <div>
      {userDetails ? (
        <div>
          <p><strong>Display Name:</strong> {userDetails.displayName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Photo URL:</strong> {userDetails.photoURL}</p>
          <p><strong>Email Verified:</strong> {String(userDetails.emailVerified)}</p>
          <p><strong>UID:</strong> {userDetails.uid}</p>
        </div>
      ) : (
        <p>No user is currently signed in.</p>
      )}
    </div>
  );
}

export default FirebaseUserDetails;