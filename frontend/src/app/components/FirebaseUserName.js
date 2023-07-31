import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";

function FirebaseUserName() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const authInstance = getAuth();

    // Using onAuthStateChanged for real-time listening
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const details = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid
        };

        setUserDetails(details);
      } else {
        setUserDetails(null);
      }
    });

    // Unsubscribe from the listener when the component is unmounted
    return () => {
      unsubscribe();
    };

  }, []);

  return (
  <div>
    {userDetails ? (
      <div>
        <a href="/accountpage">
        {userDetails.photoURL && <img src={userDetails.photoURL} alt="User's profile" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />}
        </a>
        {/*<p><strong>Display Name:</strong> {userDetails.displayName}</p>*/}
        {/*<p><strong>Email:</strong> {userDetails.email}</p>*/}
        {/*<p><strong>Email Verified:</strong> {String(userDetails.emailVerified)}</p>*/}
        {/*<p><strong>UID:</strong> {userDetails.uid}</p>*/}
      </div>
    ) : (
        <a href="/firebaseauth">
        <img
          src="https://imagizer.imageshack.com/img922/1508/00uUdj.png"
          alt=" "
          width="50"
          height="50"
        />
      </a>
    )}
  </div>
);
}

export default FirebaseUserName;

