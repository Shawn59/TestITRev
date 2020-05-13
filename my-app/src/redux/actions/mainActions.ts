import {GET_WALKING_FETCH} from "../types";

export function getWalkingFetchAction() {
    return async (dispatch: any) => {
        const response = await fetch(
            "http://localhost:3000/walking",
            {method: "GET"}
         );
        const json = await response.json();
        dispatch({
            type: GET_WALKING_FETCH,
            payload: {
                walkingData: json,
                isLoadWalkingData: true
            }
        })
    }
}
