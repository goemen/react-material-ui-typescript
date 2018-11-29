import { Map } from 'immutable';
import { User } from '../state/User';
import { IAppAction, ActionType } from 'src/actions/Helpers';
import * as _ from 'lodash';
import { DataState } from '../state/DataState';

export const UsersReducer = (state: DataState = new DataState(), action: IAppAction): DataState => {
  switch (action.type) {
    case ActionType.GET_USERS_REQUEST:
      state = state.set(DataState.DONE_LOADING, false) as DataState;
      return state.set(DataState.LOADING, true) as DataState;
    case ActionType.GET_USERS_FAIL:
      state = state.set(DataState.DONE_LOADING, false) as DataState;
      return state.set(DataState.LOADING, false) as DataState;
    case ActionType.GET_USERS_SUCCESS: {
      const items = (action.payload as any[])
      .map(i => new User(_.assign({}, i, {claims: i.customClaims})))
      .reduce((acc: Map<string, User>, user: User) => {
        return acc.set(user.uid, user);
      }, Map<string, User>());

      state = state.set(DataState.ITEMS, items) as DataState; 
      state = state.set(DataState.DONE_LOADING, true) as DataState;
      return state.set(DataState.LOADING, false) as DataState;
    }
    default:
      return state;
  }
};
