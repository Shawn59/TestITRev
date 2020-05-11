import React, {FC, Fragment} from "react";
import "./style.css";
const ASK = 1;
const DESK = -1;
let sortObj: TSortObj = {};

type TSortObj = {
    [key: string]: number
}

const setTypeSort = (columnName: string, columnData: Array<any>, setColumnDate: Function) => {
    let newColumnData = [];
    if (!sortObj[columnName]) {
        sortObj[columnName] = ASK;
        newColumnData = columnData.sort((a, b) => a[columnName].value - b[columnName].value);
    } else if (sortObj[columnName] === ASK) {
        sortObj[columnName] = DESK;
        newColumnData = columnData.sort((a, b) => b[columnName].value - a[columnName].value);
    } else {
        sortObj = {};
        // дефолтная сортировка по id
        newColumnData = columnData.sort((a, b) => a.id - b.id);
    }

    setColumnDate(newColumnData);
};

//возвращает заголовки таблицы
const TableHeaders: FC<ITableHeaders> = (props) => {
  const {headersData, columnData, setColumnData} = props;
     return(
         <tr className="headers-tr">
             {headersData.map(item => (
                 <th
                     className={'headers-th'}
                     key={item.id}
                     onClick={() => setTypeSort(item.name, columnData, setColumnData)}
                 >
                     <span>{item.label}</span>
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
                return(
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

type headerListType = {
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
    setColumnData: Function // для обновление данных после сортировки
    columnData: Array<any>
}

export interface ITable {
    data: Array<any>
    headers: Array<headerListType>,
}


const Table: FC<ITable> = (props) => {
    const {headers = [], data = []} = props;
    const [columnData, setColumnData] = React.useState<Array<any>>(data);

    console.log('render!!!');
    // поправить потом условие
    if (data.length && !columnData.length) {
        setColumnData(data);
    }

    //const mySetColumnData = ();

    return (
        <table className={'table'}>
            <thead>
                <TableHeaders
                    headersData={headers}
                    setColumnData={setColumnData}
                    columnData={columnData}
                />
            </thead>
            <tbody>
                <TableCell
                    columnData={columnData}
                />
            </tbody>
        </table>
    );
};

export default Table;









