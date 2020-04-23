import React, {FC, Fragment} from "react";
import "./style.css";

const sortObj = {};

const sortBy = (columnName: string) => {
    console.log(columnName);
};

const TableHeaders: FC<ITableHeaders> = (props) => {
  const {headers} = props;
     return(
         <tr className="headers-tr">
             {headers.map(item => (
                 <th
                     className={'headers-th'}
                     key={item.id}
                     onClick={() => sortBy(item.name)}
                 >
                     <span>{item.label}</span>
                 </th>
             ))}
         </tr>
     );
};

const TableCell: FC<ITableData> = (props) => {
    const {data} = props;
    return (
        <Fragment>
            {data.map(item => {
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
    data: Array<any>,
   /* headerNames: Array<string>*/
}

export interface ITableHeaders {
    headers: Array<headerListType>,
}

export interface ITable extends ITableData, ITableHeaders{}

const Table: FC<ITable> = (props) => {
    const {headers, data} = props;

    return (
        <table className={'table'}>
            <thead>
                <TableHeaders
                    headers={headers}
                />
            </thead>
            <tbody>
                <TableCell
                    data={data}
                />
            </tbody>
        </table>
    );
};

export default Table;








