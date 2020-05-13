import {SET_OPEN_MODAL_ADD, ADD_WALKING_FETCH, SET_WALKING_RECORD, SET_WALKING_RECORD_ID} from "./types"
import moment from "moment";

export type TRecord = {
  [key: string]: object
  date: {
      name: string,
      value: Date,
      isValid : boolean
  },
  distance: {
      name: string,
      value: number,
      isValid : boolean
  }
};

type TState = {
    isOpenModalAdd: boolean,
    recordId: number,
    record: TRecord
    isValidDataModal: boolean
};


const initState = {
    isOpenModalAdd: false,
    isValidDataModal: false,
    recordId: 0,
    record: {
        date: {
            name: 'date',
            value: moment().toDate(),
            isValid: false
        },
        distance: {
            name: 'distance',
            value: 0,
            isValid: false
        }
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
        case ADD_WALKING_FETCH:
        case SET_WALKING_RECORD: {
            return {
                ...state,
                record: action.payload
            };
        }
        case SET_WALKING_RECORD_ID: {
            return {
                ...state,
                recordId: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
