import { AppState } from '../state/AppState';
import { createSelector } from 'reselect';
const randomColor = require('randomcolor');
import * as _ from 'lodash';
const moment = require('moment');
import { DataState } from '../state/DataState';
import { User } from '../state/User';
import { Event } from '../state/Event';
import { SearchQuery } from '../state/SearchQuery';
import { Map } from 'immutable';

const materialItemsSelector = (state: AppState): any => state.materials.items;
const mailSelector = (state: AppState): any => state.mail;
const usersSelector = (state: AppState): DataState<User, any> => state.users;
const eventsSelector = (state: AppState): DataState<Event, SearchQuery> => state.events;

export const getMaterialChartItems = createSelector(materialItemsSelector, (items: any[]) => {
    const categories = _.groupBy(items, x => x.category);
    const data = _.keys(categories).map(category => ({ name: category, value: categories[category].length, fill: randomColor() }));

    return data;
});

export const getMailitems = createSelector(mailSelector, (mail: any) => {
    return _.sortBy(mail.items.map((item: any) => 
    _.assign({}, item, {createdAt: moment(item.createdAt)}), (i: any) => i.createdAt));
});

export const getUsers = createSelector(usersSelector, (users: DataState<User, any>) => {
    return users;
});

export const getEvents = createSelector(eventsSelector, (events: DataState<Event, SearchQuery>) => {
    const selectedId = events.selectedId;
    if (selectedId) {
        events = events.set(DataState.SELECTION, events.items.get(selectedId)) as DataState<Event, SearchQuery>;
    }

    const query = events.searchQuery;

    if (query && query.apply) {
        // apply filter
        let items: Map<string, Event> = events.get(DataState.ITEMS).toMap();

        // filter by location
        items = items.filter((e: Event) => {
            console.log(e.location, query.location);
            const locations = (query.location || []).map(l => l.toLowerCase());
            const eventLocation = e.location.toLowerCase();

            return _.intersection(locations, [eventLocation]).length > 0;
        }).toMap();

        

        events = events.set(DataState.ITEMS, items) as DataState<Event, SearchQuery>;
    }

    return events;
});