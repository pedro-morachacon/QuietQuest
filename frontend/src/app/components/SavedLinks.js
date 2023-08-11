import React, { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
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
              ...doc.data(),
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
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("Error deleting link: ", error);
    }
  };

  const openYouTube = () => {
    const newWindow = window.open(
      "https://www.youtube.com/",
      "_blank",
      "width=500,height=300,noopener,noreferrer"
    );
    if (newWindow) {
      // Check if the window was successfully opened
      newWindow.focus(); // Focus the new window if it was opened
    } else {
      alert("The popup was blocked. Please allow popups for this website.");
    }
  };

  // Function to handle clicking on a link item
  const handleLinkClick = (linkUrl) => {
    const newWindow = window.open(
      linkUrl,
      "_blank",
      "width=500,height=300,noopener,noreferrer"
    );
    if (!newWindow) {
      alert("The popup was blocked. Please allow popups for this website.");
    }
  };

  return (
    <div id="saved-links">
      {user ? (
        <React.Fragment>
          <button
            onClick={openYouTube}
            style={{ display: "flex", alignItems: "center" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              style={{ marginRight: "10px" }}
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Create Link
          </button>

          {/* <input
        type="text"
        placeholder="Add Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // style={{ marginRight: '30px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Add Video URL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          style={{ flex: 1, marginRight: '20px' }} // Take available space and add some margin to the right
        />
        <button onClick={addLink} style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style={{ marginRight: '10px'}}>
          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
        </svg> Save   
        </button>
      </div> */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Add Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "calc(76% - 10px)" }} // Set the width to match the second text field
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Add Video URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                style={{
                  width: "calc(76% - 10px)",
                  marginRight: "10px",
                }} // Set the width to match the first text field
              />
              <button
                onClick={addLink}
                style={{ display: "flex", alignItems: "center" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  style={{ marginRight: "2px" }}
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
                Save
              </button>
            </div>
          </div>

          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <button onClick={() => deleteLink(link.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    style={{ marginRight: "10px" }}
                  >
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                  </svg>
                </button>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>
            Please{" "}
            <a href="./firebaseauth" target="_blank" rel="noopener noreferrer">
              Login In or Sign Up
            </a>{" "}
            to save links
          </p>
          <ul>
            <li>
              <a
                href="https://youtu.be/aNXKjGFUlMs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Breathing Exercise
              </a>
            </li>
            <li>
              <a
                href="https://youtu.be/DqewBvd-bAA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nature Sounds
              </a>
            </li>
            <li>
              <a
                href="https://youtu.be/qe3NVV096wI"
                target="_blank"
                rel="noopener noreferrer"
              >
                White Noise
              </a>
            </li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default SavedLinks;
