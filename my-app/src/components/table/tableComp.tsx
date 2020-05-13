import React, {FC, Fragment, MouseEventHandler} from "react";
import "./style.css";
import iconArrow from "../../images/arrow.svg";
import iconArrowBottom from "../../images/arrow-bottom.svg";

const ASK = 1;
const DESK = -1;
let sortObj: TSortObj = {};

type TSortObj = {
    [key: string]: number
}

export type headerListType = {
    id: number,
    name: string,
    label: string,
    type: string
}

export interface ITableData {
    columnData: Array<any>
    actionChangeRecord: Function
    actionDeleteRecord: Function
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
    actionChangeRecord: Function,
    actionDeleteRecord: Function
}

//сортировочка
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

    let headers = headersData.map(item => (
        <th
            className={'headers-th'}
            key={item.id}
            onClick={() => setTypeSort(item.name, columnData, setColumnData)}
        >
            <div className="header-block">
                <span>{item.label}</span>
                {sortObj[item.name]
                    ? <img className={sortObj[item.name] === -1 ? 'transformOnBottom' : ''} src={iconArrow}/>
                    : <img src={iconArrowBottom}/>
                }
            </div>
        </th>
    ));

    headers.push(
        <th
            className={'headers-th header-operations'}
            key={'operation'}
        >
            <div className="header-block">
                <span>{'Операции'}</span>
            </div>
        </th>
    );
    return (
        <tr className="headers-tr">
            {headers}
        </tr>
    );
};

// возвращает данные таблицы
const TableCell: FC<ITableData> = (props) => {
    const {columnData, actionChangeRecord, actionDeleteRecord} = props;

    return (
        <Fragment>
            {columnData.map((item, index) => {
                return (
                    <tr key={item.id} className={"body-tr" + (index % 2 === 0 ? " even-tr" : '')}>
                        {Object.keys(item).map((property, index) => {
                            if (property !== "id") {
                                return (
                                    <td className="body-td" key={index}>
                                        <span>{item[property].label}</span>
                                    </td>
                                )
                            }
                        })}

                        <td className="body-td" key={'operation' + item.id}>
                            <div className="cell-operations">
                                <span onClick={() => actionChangeRecord(item)}>{'Изменить'}</span>
                                <span onClick={() => actionDeleteRecord(item.id)}>{'Удалить'}</span>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </Fragment>
    );
};

const Table: FC<ITable> = (props) => {
    const {headers = [], data = [], actionAddRecord, actionChangeRecord, actionDeleteRecord} = props;
    const [columnData, setColumnData] = React.useState<Array<any>>(data);

    //console.log('render!!!');
    // поправить потом условие
    if (data.length && !columnData.length) {
        setColumnData(data);
    }

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
                        actionChangeRecord={actionChangeRecord}
                        actionDeleteRecord={actionDeleteRecord}
                    />
                </tbody>
            </table>

            <button className={"save-btn"} onClick={actionAddRecord}>Добавить запись</button>
        </Fragment>
    );
};

export default Table;









