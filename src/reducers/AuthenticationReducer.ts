import { IAppAction, ActionType } from './../actions/Helpers';
import { User } from '../state/User';

export const AuthenticationReducer = (state: User = null, action: IAppAction): User => {
    switch (action.type) {
        case ActionType.CURRENT_USER:
            return new User(action.payload);
        case ActionType.DRAWS:
            return state.set(User.TICKET_DRAWS, action.payload) as User;
        case ActionType.LOGOUT_REQUEST:
            return null;
        default:
            return state;
    }
};