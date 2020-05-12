import {SET_OPEN_MODAL_ADD, ADD_WALKING_FETCH, SET_WALKING_RECORD} from "./types"
import moment from "moment";

export type TRecord = {
  date: Date,
  distance: number
};

type TState = {
    isOpenModalAdd: boolean,
    record: TRecord
};

const initState = {
    isOpenModalAdd: false,
    record: {
        date: moment().toDate(),
        distance: 0
    }
};

export const tableWalkingReducer = (state: TState = initState, action: any) => {
    switch (action.type) {
        case SET_OPEN_MODAL_ADD: {
            return {
                ...state,
                isOpenModalAdd: action.payload
            };
        }
        case ADD_WALKING_FETCH: {
            return {
                ...state,
                record: action.payload
            };
        }
        case SET_WALKING_RECORD: {
            return {
                ...state,
                record: action.payload
            };
        }
        default: {
            return state;
        }
    }
};