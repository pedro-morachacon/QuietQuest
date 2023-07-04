import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useMap} from "react-leaflet";
import ParentComponent from "@/app/components/ParentComponent";

// const Datepicker = () => {
//
//     const [date, setDate] = useState(new Date());
//
//     const handleDateChange = (selectedDate) => {
//         // console.log('date and time：', selectedDate);
//         console.log('Date：', selectedDate.toLocaleDateString());
//         console.log('Time：', selectedDate.toLocaleTimeString());
//         setDate(selectedDate);
//     };
//
//     return (
//         <DatePicker
//             // selected={date}
//             selected={date}
//             onChange={handleDateChange}
//             showTimeSelect
//             dateFormat="Pp"
//         />
//     );
// };
//
// export default Datepicker;





const Datepicker = ({ setDate, setTime }) => {

    // const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        // console.log('date and time：', selectedDate);
        console.log('Date：', selectedDate.toLocaleDateString());
        console.log('Time：', selectedDate.toLocaleTimeString());
        // setDate(selectedDate);

        setDate(selectedDate.toLocaleDateString());
        setTime(selectedDate.toLocaleTimeString());
    };

    return (
        <DatePicker
            // selected={date}
            selected={new Date()}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    );
};

export default Datepicker;
