import React, {FC, Fragment} from "react";
import {headerListType} from "../table/tableComp";
import Table from '../table/tableComp';
import ModalWindow from "../modalWindow/modalWindow";
import {connect, useDispatch, useSelector} from "react-redux";
import {setIsOpenModalAdd} from "../../redux/actions/tableActions";

export interface ITableWalking {
    data: Array<any>,
    headers: Array<headerListType>,
}

const TableWalking: FC<ITableWalking> = (props) => {
    const {headers, data} = props;

    // ХУКИ Редакса
    const dispatch = useDispatch();

    // получаем стэйт из стора
    const tableWalkingStore = useSelector((state: any) => {
        return state.tableReducer;
    });

    const addRecord = () => {
        dispatch(setIsOpenModalAdd(true));
    };

    const changeRecord = () => {
        dispatch(setIsOpenModalAdd(true));
    };

    const closedModal = () => {
        return dispatch(setIsOpenModalAdd(false));
    };

    return (
        <Fragment>
            <Table
                headers={headers}
                data={data}
                actionAddRecord={addRecord}
                actionChangeRecord={changeRecord}
            />

            <ModalWindow
                open={tableWalkingStore.isOpenModalAdd}
                actionClosed={closedModal}
                contentChildren={
                    <Fragment>
                        <div className="modal-row">
                            <span>Дата</span>
                            <input type="date"/>
                        </div>
                        <div className="modal-row">
                            <span>Дистанция</span>
                            <input type="number"/>
                        </div>
                    </Fragment>
                }

                footerChildren={
                    <Fragment>
                        <button>Добавить</button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default connect()(TableWalking);