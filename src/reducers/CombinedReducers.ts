import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from "./AuthenticationReducer";

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer
});