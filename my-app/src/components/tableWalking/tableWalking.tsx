import React, {FC, Fragment} from "react";
import {headerListType} from "../table/tableComp";
import Table from '../table/tableComp';
import ModalWindow from "../modalWindow/modalWindow";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    setIsOpenModalAdd,
    addWalkingFetchAction,
    setWalkingRecordData
} from "../../redux/actions/tableWalkingActions";
import DatePicker from "../datePicker/datePicker";

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
        return state.tableWalkingReducer;
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

    const handleChangeDistance = (e: any) => {
       return e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, '');
    };

    const handleAddRecord = (e: any) => {
        dispatch(addWalkingFetchAction(tableWalkingStore.record));
    };

    const datePickerChange = (value: Date, event: Event) => {
        dispatch(setWalkingRecordData(tableWalkingStore.record, 'date', value));
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
                            <DatePicker
                                format="DD.MM.YYYY"
                                placeholder="20.20.2020"
                                invalid={false}
                                disabled={false}
                                label="Дата"
                                actionChange={datePickerChange}
                                selectedDate={tableWalkingStore.record.date}
                            />
                        </div>
                        <div className="modal-row">
                            <span>Дистанция</span>
                            <input
                                type="text"
                                onChange={handleChangeDistance}
                                value={tableWalkingStore.record.distance}
                                maxLength={6}
                            />
                        </div>
                    </Fragment>
                }

                footerChildren={
                    <Fragment>
                        <button onClick={handleAddRecord}>Добавить</button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default connect()(TableWalking);