import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useState} from "react";

function UpdatePhotoURL() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // 1. Upload the photo to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, 'user_photos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen to the upload's three states: 'state_changed', 'error', and 'complete'
    uploadTask.on('state_changed',
      (snapshot) => {
        // Can handle progress here, omitted for brevity
      },
      (error) => {
        // Handle upload errors
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // 2. Update user.photoURL
          const auth = getAuth();
          const user = auth.currentUser;

          if(user) {
            updateProfile(user, {
              photoURL: downloadURL
            }).then(() => {
              console.log("Photo URL updated!");
            }).catch((error) => {
              console.error("Error updating photoURL:", error);
            });
          }
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload & Set Photo URL</button>
    </div>
  );
}

export default UpdatePhotoURL;
