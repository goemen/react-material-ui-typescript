import { Map } from 'immutable';
import { User } from '../state/User';
import { IAppAction, ActionType } from 'src/actions/Helpers';
import * as _ from 'lodash';

export const UsersReducer = (state: Map<string, User> = null, action: IAppAction): Map<string, User> => {
  switch (action.type) {
    case ActionType.GET_USERS_SUCCESS: {
      return (action.payload as any[])
      .map(i => new User(_.assign({}, i, {claims: i.customClaims})))
      .reduce((acc: Map<string, User>, user: User) => {
        return acc.set(user.uid, user);
      }, Map<string, User>());
    }
    default:
      return state;
  }
};
