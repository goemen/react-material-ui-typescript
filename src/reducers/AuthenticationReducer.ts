import { IAppAction, ActionType } from './../actions/Helpers';
import { User } from '../state/User';

export const AuthenticationReducer = (state: User = null, action: IAppAction): User => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return new User({email: action.payload.email, name: 'Goeme', roles: ['Admin']});
        default:
            return state;
    }
};