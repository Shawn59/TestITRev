import React, {FC, Fragment} from "react";
import TableWalking from '../components/tableWalking/tableWalking';
import Moment from 'moment'
import {useDispatch, useSelector} from 'react-redux';
import {getWalkingFetchAction} from "../redux/actions/mainActions"

// перенести getWalkingFetchAction в таблицу
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

const getTextDistance = (distance: number) => {
    let km = Math.floor(distance / 1000);
    let m = distance % 1000;
    return (km ? km + ' километров' : '') + (m ? ' ' + m + ' метров' : '');
};

const Main:FC = (props) => {
    // ХУКИ Редакса
    const dispatch = useDispatch();

    // получаем стэйт из стора
    const walkingStore = useSelector((state: any) => {
        return state.mainReducer;
    });

    if (!walkingStore.isLoadWalkingData) {
        dispatch(getWalkingFetchAction())
    }

    const setData = (sourceData: Array<any>) => {
        return sourceData.map(item => {
           return {
               id: item.id,
               date: {
                   label: Moment(item.date).format('DD.MM.YYYY'), // лейблы выводим в таблице
                   value: Moment(item.date).unix() // по вэлью делаем сортировку
               },
               distance: {
                   label: getTextDistance(item.distance),
                   value: item.distance
               },
           }
        });
    };

    return (
        <div className={'table-block'}>
            <TableWalking
                headers={headers}
                data={setData(walkingStore.walkingData)}
            />
        </div>
    );
};

export default Main;