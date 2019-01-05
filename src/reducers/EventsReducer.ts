import { IAppAction, ActionType } from '../actions/Helpers';
import { DataState } from '../state/DataState';
import { Event } from '../state/Event';
import { Map } from 'immutable';
import { SearchQuery } from '../state/SearchQuery';

export const EventsReducer = (state: DataState<Event, SearchQuery> = new DataState(), action: IAppAction): DataState<Event, SearchQuery> => {
  switch (action.type) {
    case ActionType.SELECT_EVENT:
      return state.set(DataState.SELECTION, action.payload) as DataState<Event, SearchQuery>;
    case ActionType.EDIT_EVENT:
      return state.setIn([DataState.SELECTION, action.payload.property], action.payload.value) as DataState<Event, SearchQuery>;
    case ActionType.GET_EVENTS_SUCCESS:
      const items = (action.payload.events as Event[])
        .reduce((acc: Map<string, Event>, event: Event) => {
          return acc.set(event.id, event);
        }, Map<string, Event>());
      return state.set(DataState.ITEMS, items) as DataState<Event, SearchQuery>;
    case ActionType.SAVE_EVENT_SUCCESS:
      state = state.set(DataState.SELECTION, null) as DataState<Event, SearchQuery>;
      return state.set(DataState.SELECTED_ID, action.payload.eventId) as DataState<Event, SearchQuery>;
    case ActionType.CHANGE_EVENT_SELECTION:
      state = state.set(DataState.SELECTION, action.payload.event) as DataState<Event, SearchQuery>;
      return state.set(DataState.SELECTED_ID, action.payload.eventId) as DataState<Event, SearchQuery>;
    case ActionType.SET_QUERY:
      return state.set(DataState.SEARCH_QUERY, action.payload) as DataState<Event, SearchQuery>;
    default:
      return state;
  }
};
