import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';

export const reducers = combineReducers({
    utility: UtilityReducer
});