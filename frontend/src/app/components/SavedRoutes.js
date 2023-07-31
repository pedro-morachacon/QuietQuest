import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, query, where, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const SavedRoutes = ({ endLocation, endInputValue, setEndLocation, setSavedRouteAddress }) => {
  const [routes, setRoutes] = useState([]); // Use state to store the routes
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {

    // Using onAuthStateChanged for real-time listening
    const fetchRoutes = async () => {
      if (user) {
        try {
          const usersCollectionRef = collection(db, "users", user.uid, "routes");

          const doct = await getDocs(usersCollectionRef);
          const routesData = [];
          doct.docs.forEach((doc) => {
            routesData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setRoutes(routesData);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      } else {

      }
    };

  // Using onAuthStateChanged for real-time listening
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchRoutes();
      } else {
        // User is logged out
        setRoutes([]);
      }
    });
    // Unsubscribe from the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [auth, user]);

  const addRoute = async () => {
    const usersCollectionRef = collection(db, "users", user.uid, "routes");
    // add data to Cloud Firestore
    const docRef = await addDoc(usersCollectionRef, {
      coordinates: endLocation,
      address: endInputValue
    });
    console.log("Document written with ID: ", docRef.id);
    setRoutes((prevRoutes) => [
      ...prevRoutes,
      { id: docRef.id, coordinates: endLocation, address: endInputValue },
    ]);
  };

  const deleteRoute = async (routeId) => {
    const routeDocRef = doc(db, "users", user.uid, "routes", routeId);
    // Delete the route from Cloud Firestore
    try {
      await deleteDoc(routeDocRef);
      console.log("Route deleted successfully");
      setRoutes((prevRoutes) =>
        prevRoutes.filter((route) => route.id !== routeId)
      );
    } catch (error) {
      console.error("Error deleting route: ", error);
    }
  };

  const fillEndSearchField = async (routeAddress, routeCoordinates) => {
    console.log(routeAddress);
    console.log(routeCoordinates);
    setSavedRouteAddress(routeAddress);
    setEndLocation(routeCoordinates);
  };

  return (
    <div>
      <div>
        <button onClick={addRoute}>Save Route</button>
      </div>
      <div>
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <button onClick={() => fillEndSearchField(route.address, route.coordinates)}>
                {route.address}
              </button>
              <button onClick={() => deleteRoute(route.id)}>
                Delete Route
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedRoutes;