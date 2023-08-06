import React, { useState, useEffect } from "react";
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
          uid: user.uid,
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
          <a className="user-part" href="/accountpage">
            {userDetails.photoURL && (
              <img
                src={userDetails.photoURL}
                alt="User's profile"
                style={{ width: "20px", height: "20px", borderRadius: "50%" }}
              />
            )}
          </a>
        </div>
      ) : (
        <a className="user-part" href="/firebaseauth">
          {/*login*/}
          <img
            className="user-part"
            src="https://imagizer.imageshack.com/img922/5494/bZmjvm.png"
            alt="icon for no logged in user"
            width="70"
            height="25"
            align="top"
          />
        </a>
      )}

      <style jsx>{`
        .user-part {
          float: right;
          color: D9D9D9;
          align: cente;
          display: inline-block;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default FirebaseUserName;
