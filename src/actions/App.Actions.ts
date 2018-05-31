import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';
import { Spinner } from '../state/Spinner';

export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;
    showPopup: (alert: Alert) => IAppAction;
    closePopup: () => IAppAction;  
    showSpinner: (message: string) => IAppAction;
    hideSpinner: () => IAppAction;  
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

export const showSpinner = (message: string): IAppAction => {
    return {
        type: ActionType.OPEN_SPINNER,
        payload: new Spinner({message})
    };
};

export const hideSpinner = (): IAppAction => {
    return {
        type: ActionType.CLOSE_SPINNER
    };
};