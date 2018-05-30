import { Action } from "redux";

export enum ActionType {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    OPEN_ALERT,
    CLOSE_ALERT,
    OPEN_SPINNER,
    CLOSE_SPINNER
}

export interface IAppAction extends Action<ActionType> {
    payload?: any;
}