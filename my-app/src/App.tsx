import React from 'react';
import './App.css';
import Main from './views/Main'
import DataPicker from './components/dataPicker/dataPicker';

const App: React.FC = () => {
    const [dateValue, setDateValue] = React.useState(new Date());
    const [invalid, setInvalid] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const datePickerChange = (value: Date, event: Event) => {
        setDateValue(value);

        //setInvalid
        //setDisabled
    };
  return (
      <div>
           <DataPicker
               format="dd.MM.yyyy"
               placeholder="20.20.2020"
               invalid={invalid}
               disabled={disabled}
               label="dsfsdfsd"
               actionChange={datePickerChange}
               value={dateValue}
           />
      </div>
  );
};

export default App;
