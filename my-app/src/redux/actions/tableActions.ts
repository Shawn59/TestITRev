import {SET_OPEN_MODAL_ADD} from "../types";

export function setIsOpenModalAdd(isOpenModalAdd:any) {
    return {
        type: SET_OPEN_MODAL_ADD,
        payload: isOpenModalAdd
    }
}
