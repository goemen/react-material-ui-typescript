import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';

export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;
    showPopup: (alert: Alert) => IAppAction;
    closePopup: () => IAppAction;    
    match: match<any>,
    location: any,
    history: any,
    utility: Utility;
}

export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};

export const showPopup = (data: Alert): IAppAction => {
    return {
        type: ActionType.OPEN_ALERT,
        payload: data
    };
};

export const closePopup = (): IAppAction => {
    return {
        type: ActionType.CLOSE_ALERT
    };
};