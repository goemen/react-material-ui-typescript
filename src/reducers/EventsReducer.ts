import { IAppAction } from 'src/actions/Helpers';
import { DataState } from '../state/DataState';
import { Event } from 'src/state/Event';

export const EventsReducer = (state: DataState<Event> = new DataState(), action: IAppAction): DataState<Event> => {
  switch (action.type) {
    default:
      return state;
  }
};
