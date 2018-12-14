import { Event } from "../state/Event";
import { Dispatch } from "react-redux";
import { IAppAction, ActionType } from "./Helpers";
import * as firebase from 'firebase';

export const saveEvent= (item: Event) => {
    const collection = firebase.firestore().collection("events");
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.SAVE_EVENT_REQUEST});
        try {
            const result = await collection.add(item.toSaveable());
            dispatch({ type: ActionType.SAVE_EVENT_SUCCESS, payload: result.id });
        } catch (error) {
            dispatch({ type: ActionType.SAVE_EVENT_FAIL, payload: {error}});
        }
    };
};