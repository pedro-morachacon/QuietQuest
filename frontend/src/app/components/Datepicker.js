import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useMap} from "react-leaflet";

const Datepicker = () => {

    const [date, setDate] = useState(new Date());

    // const handleDateChange = (selectedDate) => {
    //     setDate(selectedDate);
    // }

    const handleDateChange = async (selectedDate) => {
        setDate(selectedDate);

        const dateTimeToSend = selectedDate.toISOString();

        try {
            const response = await fetch('http://localhost:3000/heatmap/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dateTime: dateTimeToSend }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();

            console.log('Request succeeded with JSON response', jsonResponse);

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };


    return (
        <DatePicker
            selected={date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    );
};

export default Datepicker;
