import {combineReducers} from "redux";
import {tableReducer} from "../redux/tableReducer"
import {mainReducer} from "../redux/mainReducer"

const Reducer = combineReducers({
    tableReducer,
    mainReducer
});

export default Reducer;