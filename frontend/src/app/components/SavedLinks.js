import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, collection, getDocs, query, where, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const SavedLinks = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

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
      label: title,
      link: linkUrl,
    });
    console.log("Document written with ID: ", docRef.id);
    setLinks((prevLinks) => [
      ...prevLinks,
      { id: docRef.id, label: title, link: linkUrl },
    ]);
    // Clear the input values after saving the link
    setTitle("");
    setLinkUrl("");
  };

  const deleteLink = async (linkId) => {
    const linkDocRef = doc(db, "users", user.uid, "links", linkId);
    // Delete the link from Cloud Firestore
    try {
      await deleteDoc(linkDocRef);
      console.log("Link deleted successfully");
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.id !== linkId)
      );
    } catch (error) {
      console.error("Error deleting link: ", error);
    }
  };

  const openYouTube = () => {
    const newWindow = window.open("https://www.youtube.com/", "_blank", "width=500,height=300,noopener,noreferrer");
  if (newWindow) {
    // Check if the window was successfully opened
    newWindow.focus(); // Focus the new window if it was opened
  } else {
    alert("The popup was blocked. Please allow popups for this website.");
  }
};

   // Function to handle clicking on a link item
  const handleLinkClick = (linkUrl) => {
    const newWindow = window.open(linkUrl, "_blank", "width=500,height=300,noopener,noreferrer");
    if (!newWindow) {
      alert("The popup was blocked. Please allow popups for this website.");
    }
  };

  return (
    <div id="saved-links">
      {user ? (
          <React.Fragment>
      <button onClick={openYouTube}>Create Link</button>
      <input
        type="text"
        placeholder="Add Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add Video URL"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
      <button onClick={addLink}>Save Link</button>
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
          >
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link.link)}
            >
              {link.label}
            </a>
            <button onClick={() => deleteLink(link.id)}>
              Delete Link
            </button>
          </li>
        ))}
      </ul>
            </React.Fragment>
      ) : (
          <React.Fragment>
              <p>Please <a href="./firebaseauth" target="_blank" rel="noopener noreferrer">Login In or Sign Up</a> to save links</p>
                <ul>
                  <li>
                    <a
                      href="https://youtu.be/K-vfA4OmaRA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Video1
                    </a>
                  </li>
                  <li>
                  <a
                    href="https://youtu.be/cjaZOyBgJaU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video2
                  </a>
                </li>
            </ul>
          </React.Fragment>
          )}
    </div>
  );
};

export default SavedLinks;