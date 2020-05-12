import {SET_OPEN_MODAL_ADD} from "./types"

type TState = {
    isOpenModalAdd: boolean
};

const initState = {
    isOpenModalAdd: false
};

export const tableReducer = (state: TState = initState, action:any) => {
    switch (action.type) {
        case SET_OPEN_MODAL_ADD: {
            return {
                ...state,
                isOpenModalAdd: action.payload
            };
        }
        default: {
            return state;
        }
    }
};