import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, query, where, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const SavedRoutes = ({ endLocation, endInputValue, setEndLocation, setSavedRouteAddress }) => {
  const [routes, setRoutes] = useState([]); // Use state to store the routes
  const auth = getAuth();
  const user = auth.currentUser;

  const [openRoutes, setOpenRoutes] = useState(false);

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

  const toggleDropdown = () => {
    setOpenRoutes((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center p-2 bg-white border rounded-md"
        >
          <span className="mr-4">Saved Destinations</span>
        </button>
        {openRoutes && (
          <div className="absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white" style={{ zIndex: 1 }}>
            {user ? (
              <React.Fragment>
                <button onClick={addRoute}>Save Route</button>
                <ul>
                  {routes.map((route) => (
                    <li
                      key={route.id}
                      className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <button onClick={() => fillEndSearchField(route.address, route.coordinates)}>
                        {route.address}
                      </button>
                      <button onClick={() => deleteRoute(route.id)}>
                        Delete Route
                      </button>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <p>Please sign in to save routes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRoutes;