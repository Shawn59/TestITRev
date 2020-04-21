import React, {FC, Fragment} from "react";
import Table from '../components/table/tableComp';

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


const Main:React.FC = (props) => {
    const [walkings, setWalkings] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const setDate = (sourceData: Array<any>) => {
        return sourceData.map(item => {
           return {
               id: item.id,
               date: new Date(item.date).getTime(),
               distance: item.distance / 1000 + ' километров ' + item.distance % 1000 + ' метров'
           }
        });
    };

    React.useEffect(() => {
        if (!isLoading) {
            fetch("http://localhost:3000/walking", {
                method: "GET"
            })
                .then(res =>  res.json())
                .then(data => {
                    setWalkings(setDate(data));
                    setIsLoading(true);
                })
                .catch(error => console.log(error));
        }
    });

    console.log('render!!!');

    return (
        <div className={'table-block'}>
            <Table
                headers={headers}
                data={walkings}
            />
        </div>
    );
};

export default Main;