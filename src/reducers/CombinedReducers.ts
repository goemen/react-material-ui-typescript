import { combineReducers } from "redux";
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from "./AuthenticationReducer";
import { rootReducer as usersReducers } from "../data/users";
import { rootReducer as materialsReducers } from "../data/material";
import { rootReducer as mailReducers } from "../data/mail";

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: usersReducers,
    materials: materialsReducers,
    mail: mailReducers
});