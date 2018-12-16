import { UsersReducer } from './UsersReducer';
import { combineReducers } from 'redux';
import { UtilityReducer } from './UtilityReducer';
import { AuthenticationReducer } from './AuthenticationReducer';
import { rootReducer as materialsReducers } from '../data/material';
import { rootReducer as mailReducers } from '../data/mail';
import { EventsReducer } from './EventsReducer';
import { connectRouter } from 'connected-react-router' 
import { firestoreReducer } from 'redux-firestore';

export const createReducers = (history: any) => combineReducers({
    firestore: firestoreReducer,
    routing: connectRouter(history),
    utility: UtilityReducer,
    authentication: AuthenticationReducer,
    users: UsersReducer,
    materials: materialsReducers,
    events: EventsReducer,
    mail: mailReducers
});
