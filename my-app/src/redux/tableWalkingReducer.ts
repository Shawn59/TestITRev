import {SET_OPEN_MODAL_ADD, ADD_WALKING_FETCH, SET_WALKING_RECORD} from "./types"
import moment from "moment";

type TRecordPropDate = {

}

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
    record: TRecord
};

const initState = {
    isOpenModalAdd: false,
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