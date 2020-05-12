import {GET_WALKING_FETCH, ADD_WALKING_FETCH} from "../types";

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

/*fetch("http://localhost:3000/walking", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        date: '2019-08-24T09:35:06.654Z',
        distance: 43500
    })
})
    .then(res =>  res.json())
    .then(data => {
        console.log('add');
    })
    .catch(error => console.log(error));*/

export function addWalkingFetchAction() {
    return async (dispatch: any) => {
        const response = await fetch(
            "http://localhost:3000/walking",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: '2019-08-24T09:35:06.654Z',
                    distance: 43500
                })
            }
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