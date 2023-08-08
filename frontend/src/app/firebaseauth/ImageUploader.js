import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!image) {
      setMessage("Please select an image first.");
      return;
    }

    if (user) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "user-images/" + user.uid + "/" + image.name
      );

      try {
        await uploadBytes(storageRef, image);

        const downloadURL = await getDownloadURL(storageRef);
        setUploadedImageURL(downloadURL);

        setMessage("Image uploaded successfully!");
      } catch (err) {
        setMessage("Error uploading image: " + err.message);
      }
    } else {
      setMessage("No user is currently signed in.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} required />
        <button type="submit" className="border px-6 py-2 my-4">
          Upload Image
        </button>
      </form>

      {message && <p>{message}</p>}

      <div>
        <strong>Photo:</strong>
        {uploadedImageURL && (
          <img
            src={uploadedImageURL}
            alt="Uploaded"
            style={{ width: "100px" }}
          />
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
