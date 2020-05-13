import React, {FC, Fragment} from "react";
import TableWalking from '../components/tableWalking/tableWalking';
import moment from 'moment'
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

const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

const kmLabels = ['километр','километра', 'километров'];
const mtLabels = ['метр','метра', 'метров'];

const declOfNum = (number: number, titles: Array<string>) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return ' ' + titles[ (number % 100 > 4 && number % 100 < 20)? 2 : cases[(number % 10 < 5)? number % 10 : 5] ];
};

const getTextDistance = (distance: number) => {
    let km = Math.floor(distance / 1000);
    let m = distance % 1000;
    return (km ? km + declOfNum(km, kmLabels) : '') + (m ? ' ' + m + declOfNum(m, mtLabels) : '');
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
                   label: moment(item.date).format('DD.MM.YYYY'), // лейблы выводим в таблице
                   title: days[moment(item.date).day()],
                   value: moment(item.date).unix() // по вэлью делаем сортировку
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