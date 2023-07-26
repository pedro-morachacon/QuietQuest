import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

function RatingStar() {

    const [star, setStar] = useState();
    const [message, setMessage] = useState('');

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClick = value => {
        setCurrentValue(value);
        console.log("User selected rating:", value);
        setStar(value);
    };

    const handleMouseOver = value => {
        setHoverValue(value);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    const handleSubmit = async () => {
        // Send the rating value to server
        try {
            let response = await fetch('http://localhost:3600/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: currentValue })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            let responseData = await response.json();
            console.log('Server Response:', responseData);
            setMessage('Thanks for rating us!');
        } catch (error) {
            console.error('There was a problem sending the rating:', error);
            setMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Stars Rating</h2>
            <div style={styles.stars}>
                {stars.map((_, index) => (
                    <FaStar
                        key={index}
                        size={24}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
            {/*<textarea*/}
            {/*    placeholder="What's your feedback"*/}
            {/*    style={styles.textarea}*/}
            {/*/>*/}
            {message && <p style={{ color: 'orange' }}>{message}</p>}
            <button style={styles.button} onClick={handleSubmit}>Submit Rating</button>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
    },
    stars: {
        display: "flex",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        margin: "20px 0",
    },
    button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 100,
    margin: "10px 0",
    cursor: "pointer",
    backgroundColor: '#007BFF',
    color: 'white',
    // padding: 'px 0'
}
}

export default RatingStar;





// old version

// import React, {useState} from 'react';
// import "react-icons/fa";
// import {FaStar} from "react-icons/fa";
//
//
// const colors = {
//     orange: "#FFBA5A",
//     grey: "#a9a9a9"
// };
//
// function RatingStar () {
//
//     const [star, setStar] = useState();
//
//     const stars = Array(5).fill(0);
//     const [currentValue, setCurrentValue] = React.useState(0);
//     const [hoverValue, setHoverValue] = React.useState(undefined);
//
//     const handleClick = value => {
//         setCurrentValue(value);
//         console.log("User selected rating:", value); // Log the user's star selection
//         setStar(value);
//     };
//
//     const handleMouseOver = value => {
//         setHoverValue(value);
//     };
//
//     const handleMouseLeave = () => {
//         setHoverValue(undefined);
//     };
//
//     return (
//         <div style={styles.container}>
//             <h2>Rating Stars</h2>
//             <div style={styles.stars}>
//                 {stars.map((_, index) => {
//                     return(
//                         <FaStar
//                             key={index}
//                             size={24}
//                             style={{
//                                 marginRight: 10,
//                                 cursor: "pointer"
//                             }}
//                             color={(hoverValue || currentValue) > index ? colors.orange: colors.grey}
//                             onClick={()=> handleClick(index + 1)}
//                             onMouseOver={() => handleMouseOver(index + 1)}
//                             onMouseLeave={handleMouseLeave}
//                         />
//                     )
//                 })}
//             </div>
//             {/*<textarea*/}
//             {/*    placeholder="What's your feedbacl"*/}
//             {/*    style={styles.textarea}*/}
//             {/*/>*/}
//             <button style={styles.button}>Submit</button>
//         </div>
//     );
// };
//
//
// const styles = {
//     container: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         color: "white",
//     },
//     textarea: {
//         border: "1px solid #a9a9a9",
//         borderRadius: 5,
//         width: 300,
//         margin: "20px 0",
//         // minHeight: 100,
//         // padding: 10
//     },
//     button: {
//         border: "1px solid #a9a9a9",
//         borderRadius: 5,
//         margin: "10px 0",
//         width: 100,
//         // padding: 10
//     }
// }
//
//
// export default RatingStar;