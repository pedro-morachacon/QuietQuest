// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/app/firebase";
//
// function FetchDataForm() {
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//             console.log("User Data: ", `${doc.id} => ${doc.data().UserName}`);
//         });
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <button type="submit">Fetch User Data</button>
//         </form>
//     );
// }
//
// export default FetchDataForm;



import React, { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

function FetchDataForm() {
    // State variable to store the user names
    const [userNames, setUserNames] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let fetchedNames = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            fetchedNames.push(doc.data().UserName);
            console.log("User Data: ", `${doc.id} => ${doc.data().UserName}`);
        });

        // Update the state with the fetched user names
        setUserNames(fetchedNames);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Fetch User Data</button>
            </form>

            {/* Render the user names */}
            <ul>
                {userNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FetchDataForm;
