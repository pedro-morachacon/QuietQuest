import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/app/firebase";

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    // console.log(result);
    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;
    console.log("Name: ", name);
    console.log("Email", email);
    console.log("ProfilePic: " ,profilePic);

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePic", profilePic);

    // After the user has successfully logged in, redirect to localhost:3000
    window.location.href = "http://localhost:3000";

  }).catch((error) => {
    console.log(error);
  });
};