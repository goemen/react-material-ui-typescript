import { Event } from "../state/Event";
import { Dispatch } from "react-redux";
import { IAppAction, ActionType } from "./Helpers";

export const saveEvent= (item: Event) => {
    return async (dispatch: Dispatch<IAppAction>, getState: any, {db}: any) => {
        debugger;
        dispatch({ type: ActionType.SAVE_EVENT_REQUEST});
        try {
            const collection = db.collection("events");
            const result = await collection.add(item.toSaveable());
            dispatch({ type: ActionType.SAVE_EVENT_SUCCESS, payload: result.id });
        } catch (error) {
            dispatch({ type: ActionType.SAVE_EVENT_FAIL, payload: {error}});
        }
    };
};

export const startCreateEvent = () => {
    return {type:  ActionType.SELECT_EVENT, payload: new Event()};
};

export const editEvent = (property: string, value:  any) => {
    return {type:  ActionType.EDIT_EVENT, payload: {property, value}};
};

export const loadEvents = () => {
    return async (dispatch: Dispatch<IAppAction>, getState: any, {db}: any) => {
        dispatch({ type: ActionType.GET_EVENTS_REQUEST});
        try {
            const collection = db.collection("events");
            collection.onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
                const events: Event[] = querySnapshot.docs.map(doc => {
                    const data = {...doc.data(), id: doc.id};
                    return new Event(data);
                });

                dispatch({ type: ActionType.GET_EVENTS_SUCCESS, payload: {events} });
            });
        } catch (error) {
            dispatch({ type: ActionType.SAVE_EVENT_FAIL, payload: {error}});
        }
    };
};