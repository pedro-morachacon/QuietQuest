import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, query, where, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const SavedLinks = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [links, setLinks] = useState([]);
  const [openLinks, setOpenLinks] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      if (user) {
        try {
          const usersCollectionRef = collection(db, "users", user.uid, "links");

          const doct = await getDocs(usersCollectionRef);
          const linksData = [];
          doct.docs.forEach((doc) => {
            linksData.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setLinks(linksData);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      } else {

      }
    };

  // Using onAuthStateChanged for real-time listening
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchLinks();
      } else {
        // User is logged out
        setLinks([]);
      }
    });
    // Unsubscribe from the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [auth, user]);

  const addLink = async () => {
    const usersCollectionRef = collection(db, "users", user.uid, "links");
    // add data to Cloud Firestore
    const docRef = await addDoc(usersCollectionRef, {
        label: "test2",
      link: "test"
    });
    console.log("Document written with ID: ", docRef.id);
    setLinks((prevLinks) => [
      ...prevLinks,
      { id: docRef.id, label: "test2", link: "test" },
    ]);
  };

  const deleteLink = async (linkId) => {
    const linkDocRef = doc(db, "users", user.uid, "routes", linkId);
    // Delete the route from Cloud Firestore
    try {
      await deleteDoc(linkDocRef);
      console.log("Route deleted successfully");
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.id !== linkId)
      );
    } catch (error) {
      console.error("Error deleting link: ", error);
    }
  };

  const toggleDropdown = () => {
    setOpenLinks((prevOpen) => !prevOpen);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center p-2 bg-white border rounded-md"
        >
          <span className="mr-4">Links Dropdown Button</span>
        </button>
        {openLinks && (
          <div className="absolute right-0 w-40 py-2 mt-2 rounded-lg shadow-xl bg-white">
            <button onClick={addLink}>Save Link</button>
            <ul>
              {links.map((link) => (
                <li
                  key={link.id}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                >
                  <button>
                    {link.label}
                  </button>
                  <button onClick={() => deleteLink(link.id)}>
                    Delete Route
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedLinks;