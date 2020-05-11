import React, {FC, Fragment} from "react";
import Table from '../components/table/tableComp';
import Moment from 'moment'

const headers = [
    {
        id: 1,
        name: 'date',
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


const Main:FC = (props) => {
    const [walkings, setWalkings] = React.useState<object[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!isLoading) {
            getDataApi();
        }
    });

    const getTextDistance = (distance: number) => {
        let km = Math.floor(distance / 1000);
        let m = distance % 1000;
        return (km ? km + ' километров' : '') + (m ? ' ' + m + ' метров' : '');
    };

    const setData = (sourceData: Array<any>) => {
        return sourceData.map(item => {
           return {
               id: item.id,
               date: {
                   label: Moment(item.date).format('DD.MM.YYYY'),
                   value: Moment(item.date).startOf('day').unix()
               },
               distance: {
                   label: getTextDistance(item.distance),
                   value: item.distance
               },
           }
        });
    };
    
    const getDataApi = () => {
        fetch("http://localhost:3000/walking", {
            method: "GET"
        })
            .then(res =>  res.json())
            .then(data => {
                setWalkings(setData(data));
                setIsLoading(true);
            })
            .catch(error => console.log(error));
    };

    //console.log('render!!!');

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