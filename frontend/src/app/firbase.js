// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import firebase from "firebase/compat/app";
//
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });
//
//
// export const auth = app.auth();
// export default app;


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAulItw5ca6s2MjQLJFxK30Mf8S4loNTD4",
  authDomain: "react-auth-2d615.firebaseapp.com",
  projectId: "react-auth-2d615",
  storageBucket: "react-auth-2d615.appspot.com",
  messagingSenderId: "1079924863455",
  appId: "1:1079924863455:web:bb41cdb0a6831e51d5946a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);