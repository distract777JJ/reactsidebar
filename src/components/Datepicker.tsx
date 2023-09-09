
import  { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker() {
    const today = dayjs();
    const endDate = dayjs('2023-10-10');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DatePicker />

          <DatePicker maxDate={dayjs('2023-09-10')} />
          <DatePicker minDate={today} />
          <DatePicker
           minDate={today}
           maxDate={endDate}
           
          value={today}
           />

    </LocalizationProvider>
  );
}

export  function DynamicMaxDatePicker() {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
  
    const handleStartDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setStartDate(date);
          }
    };
  
    const handleEndDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setEndDate(date);
          }
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          //maxDate={endDate} // Set the maxDate based on endDate
        />
  
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate} // Set the minDate based on startDate
        />
      </LocalizationProvider>
    );
  }