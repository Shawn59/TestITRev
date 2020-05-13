import {
    ADD_WALKING_FETCH,
    GET_WALKING_FETCH,
    SET_OPEN_MODAL_ADD,
    SET_WALKING_RECORD,
    SET_WALKING_RECORD_ID
} from "../types";
import {TRecord} from "../tableWalkingReducer";
import {getWalkingFetchAction} from "./mainActions";
import moment from "moment";

export function setIsOpenModalAdd(isOpenModalAdd: boolean) {
    return {
        type: SET_OPEN_MODAL_ADD,
        payload: isOpenModalAdd
    }
}

export function setWalkingRecordData(record: TRecord, name: string, value: any, isValid: boolean) {
    return {
        type: SET_WALKING_RECORD,
        payload: {
            ...record,
            [name]: {
                ...record[name],
                value: value,
                isValid: isValid
            }
        }
    }
}

export function setWalkingRecordAllData(record: TRecord, dateVal: Date, distanceVal: number) {
    return {
        type: SET_WALKING_RECORD,
        payload: {
            date: {
                ...record.date,
                value: dateVal,
                isValid: true
            },
            distance: {
                ...record.distance,
                value: distanceVal,
                isValid: true
            }
        }
    }
}

export function setWalkingRecordId(id: number) {
    return {
        type: SET_WALKING_RECORD_ID,
        payload: id
    }
}

export function clearWalkingRecordData(record: TRecord) {
    return {
        type: SET_WALKING_RECORD,
        payload: {
            ...record,
            'date': {
                ...record.date,
                value: moment().toDate(),
                isValid: true
            },
            'distance': {
                ...record.distance,
                value: 0,
                isValid: false
            },
        }
    }
}

export function addWalkingFetchAction(record: TRecord) {
    return async (dispatch: any) => {
        try {
            const response = await fetch(
                "http://localhost:3000/walking",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        date: record.date.value,
                        distance: record.distance.value,
                    })
                }
            );
            const json = await response.json();
            // так как приходит только value без статуса, будем считать что всегда success
            dispatch(getWalkingFetchAction());
            //чистим данные
            dispatch(clearWalkingRecordData(record));
        } catch (e) {
            console.log(e);
        }
    }
}

export function putWalkingFetchAction(id: number, record: TRecord) {
    return async (dispatch: any) => {
        try {
            const response = await fetch(
                "http://localhost:3000/walking/" + id,
                {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        date: record.date.value,
                        distance: record.distance.value,
                    })
                }
            );
            const json = await response.json();
            // так как приходит только value без статуса, будем считать что всегда success
            dispatch(getWalkingFetchAction());
            //чистим данные
            dispatch(clearWalkingRecordData(record));
            dispatch(setWalkingRecordId(0));
        } catch (e) {
            console.log(e);
        }
    }
}

export function deleteWalkingFetchAction(id: number) {
    return async (dispatch: any) => {
        try {
            const response = await fetch(
                "http://localhost:3000/walking/" + id,
                {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const json = await response.json();
            // так как приходит только value без статуса, будем считать что всегда success
            dispatch(getWalkingFetchAction());
            //чистим данные
            dispatch(setWalkingRecordId(0));
        } catch (e) {
            console.log(e);
        }
    }
}
