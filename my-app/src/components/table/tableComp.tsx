import React, {FC, Fragment, MouseEventHandler} from "react";
import "./style.css";
import iconArrow from "../../images/arrow.svg";
import iconArrowBottom from "../../images/arrow-bottom.svg";
import {connect} from "react-redux";
import {setIsOpenModalAdd} from "../../redux/actions/tableWalkingActions";

const ASK = 1;
const DESK = -1;
let sortObj: TSortObj = {};

type TSortObj = {
    [key: string]: number
}

const setTypeSort = (columnName: string, columnData: Array<any>, setColumnDate: Function) => {
    let newColumnData = [];
    if (!sortObj[columnName]) {
        sortObj = {
            [columnName]: ASK
        };
        newColumnData = columnData.sort((a, b) => a[columnName].value - b[columnName].value);
    } else if (sortObj[columnName] === ASK) {
        sortObj = {
            [columnName]: DESK
        };
        newColumnData = columnData.sort((a, b) => b[columnName].value - a[columnName].value);
    } else {
        sortObj = {};
        // дефолтная сортировка по id
        newColumnData = columnData.sort((a, b) => a.id - b.id);
    }

    setColumnDate(newColumnData.slice());
};

//возвращает заголовки таблицы
const TableHeaders: FC<ITableHeaders> = (props) => {
    const {headersData, columnData, setColumnData} = props;
    return (
        <tr className="headers-tr">
            {headersData.map(item => (
                <th
                    className={'headers-th'}
                    key={item.id}
                    onClick={() => setTypeSort(item.name, columnData, setColumnData)}
                >
                    <span>{item.label}</span>
                    {
                        sortObj[item.name]
                            ? <img className={sortObj[item.name] === -1 ? 'transformOnBottom' : ''} src={iconArrow}/>
                            : <img src={iconArrowBottom}/>
                    }
                </th>
            ))}
        </tr>
    );
};

// возвращает данные таблицы
const TableCell: FC<ITableData> = (props) => {
    const {columnData} = props;
    return (
        <Fragment>
            {columnData.map(item => {
                return (
                    <tr key={item.id}>
                        {Object.keys(item).map((property, index) => {
                            if (property !== "id") {
                                return (
                                    <td className="cell" key={index}>
                                        <span>{item[property].label}</span>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                );
            })}
        </Fragment>
    );
};

export type headerListType = {
    id: number,
    name: string,
    label: string,
    type: string
}

export interface ITableData {
    columnData: Array<any>
}

export interface ITableHeaders {
    headersData: Array<headerListType>,
    setColumnData: Function, // для обновление данных после сортировки
    columnData: Array<any>
}

export interface ITable {
    data: Array<any>,
    headers: Array<headerListType>,
    actionAddRecord: MouseEventHandler<any>,
    actionChangeRecord: Function
}


const Table: FC<ITable> = (props) => {
    const {headers = [], data = [], actionAddRecord} = props;
    const [columnData, setColumnData] = React.useState<Array<any>>(data);
    //const [isAddRecordModal, setIsAddRecordModal] = React.useState<Boolean>(false);

    //console.log('render!!!');
    // поправить потом условие
    if (data.length && !columnData.length) {
        setColumnData(data);
    }

    const changeRecord = (id: number = 1) => {
        fetch("http://localhost:3000/walking/" + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: '2019-08-24T09:35:06.654Z',
                distance: 43500
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('add');
            })
            .catch(error => console.log(error));
    };

    const deleteRecord = () => {
        fetch("http://localhost:3000/walking/4", {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log('add');
            })
            .catch(error => console.log(error));
    };

    return (
        <Fragment>
            <table className={'table'}>
                <thead>
                    <TableHeaders
                        headersData={headers}
                        setColumnData={setColumnData}
                        columnData={data}
                    />
                </thead>
                <tbody>
                    <TableCell
                        columnData={data}
                    />
                </tbody>
            </table>

            <button onClick={actionAddRecord}>Добавить запись</button>
        </Fragment>
    );
};

// прокидывает в пропсы обьект
/*const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        isOpenModalAdd: state.tableWalkingReducer.isOpenModalAdd
    };
};

const mapDispatchToProps = {
    setIsOpenModalAdd
};*/

export default Table;









