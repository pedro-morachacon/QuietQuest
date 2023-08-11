import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ setDate, setTime }) => {

    // const [date, setDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {

        setSelectedDate(selectedDate);
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
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    );
};

export default Datepicker;


// const Datepicker = ({ setDate, setTime }) => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//
//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         setDate(date.toLocaleDateString());
//         setTime(date.toLocaleTimeString());
//     };
//
//     return (
//         <DatePicker
//             selected={selectedDate}
//             onChange={handleDateChange}
//             showTimeSelect
//             dateFormat="Pp"
//         />
//     );
// };
//
// export default Datepicker;
