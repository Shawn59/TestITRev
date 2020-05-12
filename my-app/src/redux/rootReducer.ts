import {combineReducers} from "redux";
import {tableWalkingReducer} from "../redux/tableWalkingReducer"
import {mainReducer} from "../redux/mainReducer"

const Reducer = combineReducers({
    tableWalkingReducer,
    mainReducer
});

export default Reducer;