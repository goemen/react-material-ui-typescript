import { Map } from 'immutable';
import { User } from '../state/User';
import { IAppAction, ActionType } from '../actions/Helpers';
import * as _ from 'lodash';
import { DataState } from '../state/DataState';
import { UserClaims } from '../state/Claims';

export const UsersReducer = (state: DataState<User, any> = new DataState(), action: IAppAction): DataState<User, any> => {
  switch (action.type) {
    case ActionType.GET_USERS_REQUEST:
      state = state.set(DataState.DONE_LOADING, false) as DataState<User, any>;
      return state.set(DataState.LOADING, true) as DataState<User, any>;
    case ActionType.GET_USERS_FAIL:
      state = state.set(DataState.DONE_LOADING, false) as DataState<User, any>;
      return state.set(DataState.LOADING, false) as DataState<User, any>;
    case ActionType.GET_USERS_SUCCESS: {
      const items = (action.payload as any[])
        .map(i => new User(_.assign({}, i, { claims: new UserClaims(i.customClaims || {}) })))
        .reduce((acc: Map<string, User>, user: User) => {
          return acc.set(user.uid, user);
        }, Map<string, User>());

      state = state.set(DataState.ITEMS, items) as DataState<User, any>;
      state = state.set(DataState.DONE_LOADING, true) as DataState<User, any>;
      return state.set(DataState.LOADING, false) as DataState<User, any>;
    }
    case ActionType.SET_USER_CLAIMS_REQUEST:
      return state.set(DataState.SAVE_IN_PROGRESS, true) as DataState<User, any>;
    case ActionType.SET_USER_CLAIMS_FAIL:
      return state.set(DataState.SAVE_IN_PROGRESS, false) as DataState<User, any>;
    case ActionType.SELECT_USER:
      state = state.set(DataState.SELECTION_INDEX, action.payload.index) as DataState<User, any>;
      return state.set(DataState.SELECTION, action.payload.user) as DataState<User, any>;
    case ActionType.SET_USER_TABLE_PAGE:
      return state.set(DataState.PAGE_INDEX, action.payload) as DataState<User, any>;
    case ActionType.EDIT_USER:
      return state.setIn([DataState.SELECTION, action.payload.path], action.payload.value) as DataState<User, any>;
    case ActionType.SET_USER_CLAIMS_SUCCESS:
      state = state.set(DataState.SAVE_IN_PROGRESS, false) as DataState<User, any>;
      return state.setIn([DataState.ITEMS, action.payload.userId], state.get(DataState.SELECTION) as User) as DataState<User, any>;
    default:
      return state;
  }
};
