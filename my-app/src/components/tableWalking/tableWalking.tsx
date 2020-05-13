import React, {FC, Fragment} from "react";
import {headerListType} from "../table/tableComp";
import Table from '../table/tableComp';
import ModalWindow from "../modalWindow/modalWindow";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsOpenModalAdd,
    addWalkingFetchAction,
    setWalkingRecordData,
    putWalkingFetchAction,
    setWalkingRecordId,
    deleteWalkingFetchAction,
    clearWalkingRecordData,
    setWalkingRecordAllData
} from "../../redux/actions/tableWalkingActions";
import DatePicker from "../datePicker/datePicker";
import moment from "moment";

export interface ITableWalking {
    data: Array<any>,
    headers: Array<headerListType>,
}

const TableWalking: FC<ITableWalking> = (props) => {
    const {headers, data} = props;

    //console.log("RENDER!!!!");

    // ХУКИ Редакса
    const dispatch = useDispatch();

    // получаем стэйт из стора
    const tableWalkingStore = useSelector((state: any) => {
        return state.tableWalkingReducer;
    });

    const closedModal = () => {
        dispatch(setIsOpenModalAdd(false));
        dispatch(clearWalkingRecordData(tableWalkingStore.record));
    };

    //обработчики полей
    const handleChangeDistance = (e: any) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, '');

        if (e.currentTarget.value !== '' && e.currentTarget.value > 0) {
            dispatch(setWalkingRecordData(tableWalkingStore.record, 'distance', +e.currentTarget.value, true));
        } else {
            dispatch(setWalkingRecordData(tableWalkingStore.record, 'distance', +e.currentTarget.value, false));
        }
    };

    const datePickerChange = (value: Date, event: Event) => {
        if (value) {
            dispatch(setWalkingRecordData(tableWalkingStore.record, 'date', value, true));
        } else {
            dispatch(setWalkingRecordData(tableWalkingStore.record, 'date', value, false));
        }
    };

    const checkValidData = () => {
        return tableWalkingStore.record.date.isValid && tableWalkingStore.record.distance.isValid;
    };

    // операции
    const addRecord = () => {
        dispatch(setIsOpenModalAdd(true));
    };

    const changeRecord = (recordData: {[key: string]: any}) => {
        dispatch(setIsOpenModalAdd(true));
        dispatch(setWalkingRecordId(recordData.id));
        dispatch(setWalkingRecordAllData(
            tableWalkingStore.record,
            moment.unix(recordData.date.value).toDate(),
            recordData.distance.value
        ));
    };

    const deleteRecord = (id: number) => {
        dispatch(deleteWalkingFetchAction(id));
    };

    const handleOperationRecord = (e: any) => {
        let isDuplicate = data.find(item => {
            return item.date.label === moment(tableWalkingStore.record.date.value).format('DD.MM.YYYY');
        });

        if (isDuplicate && tableWalkingStore.recordId !== isDuplicate.id) {
            alert('Выберите другую дату. Такая дата уже используется в другой записи');
            return
        }
        if (tableWalkingStore.recordId) {
            dispatch(putWalkingFetchAction(tableWalkingStore.recordId, tableWalkingStore.record));
        } else {
            dispatch(addWalkingFetchAction(tableWalkingStore.record));
        }
        dispatch(setIsOpenModalAdd(false));
    };

    /*console.log(tableWalkingStore.record.date.value);*/

    return (
        <Fragment>
            <Table
                headers={headers}
                data={data}
                actionAddRecord={addRecord}
                actionChangeRecord={changeRecord}
                actionDeleteRecord={deleteRecord}
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
                                selectedDate={tableWalkingStore.record.date.value}
                                maxDate={moment().toDate()}
                            />
                        </div>

                        <div className="modal-row">
                            <span>Дистанция</span>
                            <input
                                type="text"
                                className={tableWalkingStore.record.distance.isValid ? "" : "error-border"}
                                onChange={handleChangeDistance}
                                value={tableWalkingStore.record.distance.value}
                                maxLength={6}
                            />
                        </div>
                    </Fragment>
                }

                footerChildren={
                    <Fragment>
                        <button disabled={!checkValidData()} onClick={handleOperationRecord}>Сохранить</button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default TableWalking;
