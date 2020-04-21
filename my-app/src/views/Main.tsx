import React, {FC, Fragment} from "react";
import Table from '../components/table/tableComp';
import Moment from 'moment'

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
    const [walkings, setWalkings] = React.useState<object[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const getTextDistance = (distance: number) => {
        let km = Math.floor(distance / 1000);
        let m = distance % 1000;
        return (km ? km + ' километров' : '') + (m ? ' ' + m + ' метров' : '');
    };

    const setDate = (sourceData: Array<any>) => {
        return sourceData.map(item => {
           return {
               id: {
                   label: item.id,
                   value: item.id
               },
               date: {
                   label: Moment(item.date).format('DD.MM.YYYY'),
                   value: Moment(item.date).unix()
               } ,
               distance: {
                   label: getTextDistance(item.distance),
                   value: item.distance
               },
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