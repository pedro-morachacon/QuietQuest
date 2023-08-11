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
        // User is logged out
        setRoutes([]);
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
    setSavedRouteAddress(routeAddress);
    setEndLocation(routeCoordinates);
  };

  return (
    <div>
        {user ? (
          <React.Fragment>
            <div id="saved-routes">
            <button onClick={addRoute} style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style={{ marginRight: '10px' }}><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
              Save Destination
            </button>
            <ul>
              {routes.map((route) => (
                <li key={route.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => deleteRoute(route.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style={{ marginRight: '10px' }}><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                  </button>
                  <button onClick={() => fillEndSearchField(route.address, route.coordinates)} style={{ display: 'flex', alignItems: 'center' }}>
                    {/*<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style={{ marginRight: '10px' }}><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>*/}
                    {route.address}
                  </button>
                </li>
              ))}
            </ul>
            </div>
          </React.Fragment>
        ) : (
          <p id="saved-routes">Please <a href="./firebaseauth" target="_blank" rel="noopener noreferrer">Login In or Sign Up</a> to save routes</p>
        )}
    </div>
  );
};

export default SavedRoutes;