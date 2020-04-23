import React from 'react';
import './App.css';
import Main from './views/Main'
import DatePicker from './components/datePicker/datePicker';
import moment from "moment";

const App: React.FC = () => {
    const [dateValue, setDateValue] = React.useState(moment().toDate());
    const datePickerChange = (value: Date, event: Event) => {
        setDateValue(value);
    };

  return (
      <div>
           <DatePicker
               format="DD.MM.YYYY"
               placeholder="20.20.2020"
               invalid={false}
               disabled={false}
               label="dsfsdfsd"
               actionChange={datePickerChange}
               selectedDate={dateValue}
           />
      </div>
  );
};

export default App;
