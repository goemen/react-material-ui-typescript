import { IAppAction, ActionType } from 'src/actions/Helpers';
import { DataState } from '../state/DataState';
import { Event } from 'src/state/Event';
import { Map } from 'immutable';

export const EventsReducer = (state: DataState<Event> = new DataState(), action: IAppAction): DataState<Event> => {
  switch (action.type) {
    case ActionType.SELECT_EVENT:
      return state.set(DataState.SELECTION, action.payload) as DataState<Event>;
    case ActionType.EDIT_EVENT:
      return state.setIn([DataState.SELECTION, action.payload.property], action.payload.value) as DataState<Event>;
    case ActionType.GET_EVENTS_SUCCESS:
      const items = (action.payload.events as Event[])
        .reduce((acc: Map<string, Event>, event: Event) => {
          return acc.set(event.id, event);
        }, Map<string, Event>());
      return state.set(DataState.ITEMS, items) as DataState<Event>;
    case ActionType.SAVE_EVENT_SUCCESS:
      state = state.set(DataState.SELECTION, null) as DataState<Event>;
      return state.set(DataState.SELECTED_ID, action.payload.eventId) as DataState<Event>;
    case ActionType.CHANGE_EVENT_SELECTION:
      state = state.set(DataState.SELECTION, action.payload.event) as DataState<Event>;
      return state.set(DataState.SELECTED_ID, action.payload.eventId) as DataState<Event>;
    default:
      return state;
  }
};
