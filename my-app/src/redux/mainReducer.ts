import {GET_WALKING_FETCH} from "./types"

type TState = {
    walkingData: Array<object>
    isLoadWalkingData: boolean
};

const initState = {
    walkingData: [],
    isLoadWalkingData: false
};

export const mainReducer = (state: TState = initState, action:any) => {
    switch (action.type) {
        case GET_WALKING_FETCH: {
            return {
                ...state,
                walkingData: action.payload.walkingData,
                isLoadWalkingData: action.payload.isLoadWalkingData
            };
        }
        default: {
            return state;
        }
    }
};