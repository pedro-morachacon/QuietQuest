import React, { useState } from 'react';
import Datepicker from './Datepicker';
import DateTimePicker from "react-datetime-picker";
import DatePicker from "react-datepicker";
import displayMap from "@/app/components/DisplayMap";
import DisplayMap from "@/app/components/DisplayMap";

const ParentComponent = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    return (
        <div>
            <Datepicker setDate={setDate} setTime={setTime} />
            <DisplayMap date={date} time={time} />
        </div>
    );
};

export default ParentComponent;