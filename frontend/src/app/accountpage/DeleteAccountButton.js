import React from "react";
import { getAuth, deleteUser } from "firebase/auth";

function DeleteAccountButton() {
  const handleDeleteAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      deleteUser(user)
        .then(() => {
          alert("Account successfully deleted!");
          window.location.href = "/firebaseauth/";
        })
        .catch((error) => {
          alert(
            "An error occurred while deleting the account: " + error.message
          );
        });
    } else {
      alert("No user is currently logged in.");
    }
  };

  return <button onClick={handleDeleteAccount}>Delete</button>;
}

export default DeleteAccountButton;
