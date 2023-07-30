import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const SavedRoutes = () => {
  const [user, setUser] = useState(null);
  const [docData, setDocData] = useState(null);

  const auth = getAuth();
  setUser(auth.currentUser);

  useEffect(() => {
    // Using onAuthStateChanged for real-time listening
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const usersCollectionRef = collection(db, "users");
          const userDocRef = doc(usersCollectionRef, user.uid);

          const doct = await getDoc(userDocRef);
          if (!doct.exists) {
            console.log('No such document!');
          } else {
            setDocData(doct.data());
          }
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      } else {

      }
    });
    // Unsubscribe from the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const displayList = () => {

};

  const addRoute = async () => {
    if (user) {
      try {
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);

        const doct = await getDoc(userDocRef);
        if (!doct.exists) {
          console.log('No such document!');
        } else {
          setDocData(doct.data());
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    } else {

    }
  };

  const deleteRoute = () => {

  };

  return (
    <div>
      <div>
        <button onClick={displayList}>Saved Routes</button>
      </div>
      <div>
        <ul>
          <ul>
            <li>
              <button onClick={addRoute}>Save Route</button>
            </li>
          </ul>
          <ul>
            <li>Saved Route 1</li>
            <li>
              <button onClick={deleteRoute}>Delete Route</button>
            </li>
          </ul>
          <br />
          <ul>
            <li>Saved Route 2</li>
            <li>
              <button onClick={deleteRoute}>Delete Route</button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default SavedRoutes;