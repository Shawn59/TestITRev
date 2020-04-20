import React from 'react';
import './App.css';
import Table from './components/table/tableComp';

const headers = [
  {
    id: 1,
    name: 'data',
    label: 'Дата',
    type: 'data'
  },
  {
    id: 2,
    name: 'distance',
    label: 'Дистанция',
    type: 'number'
  }
];

const data = [
  {
    id: 1,
    data: '20.02.1982',
    distance: 111
  },
  {
    id: 2,
    data: '12.02.2002',
    distance: 4343
  }
];

const App: React.FC = () => {
  return (
      <div>
        <div className={'table-block'}>
          <Table
              headers={headers}
              data={data}
          />
        </div>

      </div>
  );
};

export default App;
