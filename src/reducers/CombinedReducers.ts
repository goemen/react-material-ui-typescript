import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from "./AuthenticationReducer";
import { rootReducer as usersReducers } from "../data/users";

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: usersReducers
});