import {ADD_WALKING_FETCH, SET_OPEN_MODAL_ADD, SET_WALKING_RECORD} from "../types";
import {TRecord} from "../tableWalkingReducer";

export function setIsOpenModalAdd(isOpenModalAdd: boolean) {
    return {
        type: SET_OPEN_MODAL_ADD,
        payload: isOpenModalAdd
    }
}

// не знаю, правильно ли я сделал по канонам редакса, но в mobx мы аналогичный экшн делаем
// правда mobx мутабельный))
export function setWalkingRecordData(record: TRecord, name: string, value: any) {
    return {
        type: SET_WALKING_RECORD,
        payload: {
            ...record,
            [name]: value
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
                    body: JSON.stringify(record)
                }
            );
            const json = await response.json();
            dispatch({
                type: ADD_WALKING_FETCH,
                payload: {
                    walkingData: json,
                    isLoadWalkingData: true
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
}