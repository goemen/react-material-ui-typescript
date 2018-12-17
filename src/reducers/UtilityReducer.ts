import { IAppAction, ActionType } from './../actions/Helpers';
import { Utility } from '../state/Utility';

export const UtilityReducer = (state: Utility = new Utility(), action: IAppAction): Utility => {
    switch (action.type) {
        case ActionType.OPEN_DRAWER:
            return state.set(Utility.DRAWER_OPEN, true) as Utility;
        case ActionType.CLOSE_DRAWER:
            return state.set(Utility.DRAWER_OPEN, false) as Utility;
        case ActionType.OPEN_ALERT:
            return state.set(Utility.ALERT, action.payload) as Utility;
        case ActionType.CLOSE_ALERT:
            return state.set(Utility.ALERT, null) as Utility;
        case ActionType.OPEN_SPINNER:
            return state.set(Utility.SPINNER, action.payload) as Utility;
        case ActionType.CLOSE_SPINNER:
            return state.set(Utility.SPINNER, null) as Utility;
        case ActionType.TOGGLE_APP_LOADING:
            return state.set(Utility.APP_LOADING, !state.appLoading) as Utility;
        case ActionType.SET_ANCHOR_ELEMENT:
            return state.set(Utility.ANCHOR_EL, action.payload) as Utility;
        case ActionType.SET_NOTIFICATION_ELEMENT:
            return state.set(Utility.NOTIFICATION_EL, !state.appLoading) as Utility;
        case ActionType.CURRENT_USER:
            return state.set(Utility.APP_LOADING, false) as Utility;
        case ActionType.TOGGLE_APP_LOADING:
            return state.set(Utility.APP_LOADING, !state.appLoading) as Utility;
        default:
            return state;
    }
};