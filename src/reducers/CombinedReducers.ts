import { UsersReducer } from './UsersReducer';
import { combineReducers } from 'redux';
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from './AuthenticationReducer';
import { rootReducer as materialsReducers } from '../data/material';
import { rootReducer as mailReducers } from '../data/mail';
import { EventsReducer } from './EventsReducer';

export const reducers = combineReducers({
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: UsersReducer,
    materials: materialsReducers,
    events: EventsReducer,
    mail: mailReducers
});
