import { Event } from "../state/Event";
import { Dispatch } from "react-redux";
import { IAppAction, ActionType } from "./Helpers";
import { IEventSelect, IThunkArgs as IContext } from "src/helpers/misc";
import { DataState } from "src/state/DataState";

export interface IEventProps {
    events: DataState<Event>;
    saveEvent: (event: Event) => void;
    startCreateEvent: () => void;
    editEvent: (property: string, value: any) =>  void;
    loadEvents: () =>  void;
    changeSelection: (selection: IEventSelect) => void;
}

export const saveEvent= (item: Event) => {
    return async (dispatch: Dispatch<IAppAction>, getState: any, {db}: any) => {
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
    return async (dispatch: Dispatch<IAppAction>, getState: any, context: IContext) => {
        dispatch({ type: ActionType.GET_EVENTS_REQUEST});
        try {
            const collection = context.db.collection("events");
            collection.onSnapshot(async (querySnapshot: firebase.firestore.QuerySnapshot) => {
                const events: any[] = querySnapshot.docs.map( doc => {
                    const data = {
                        ...doc.data(),
                         id: doc.id                        };
                    return data;
                });

                for (const event of events) {
                    event.createdBy = await context.db.doc(`users/${event.createdBy}`).get().then(x => x.data());
                }



                dispatch({ type: ActionType.GET_EVENTS_SUCCESS, payload: {events: events.map(e => new Event(e))} });
            });
        } catch (error) {
            dispatch({ type: ActionType.SAVE_EVENT_FAIL, payload: {error}});
        }
    };
};

export const changeSelection = (selection: IEventSelect) => {
    return { type: ActionType.CHANGE_EVENT_SELECTION, payload: selection };
}