import { AppState } from '../state/AppState';
import { createSelector } from 'reselect';
const randomColor = require('randomcolor');
import * as _ from 'lodash';
const moment = require('moment');
import { DataState } from '../state/DataState';
import { User } from '../state/User';
import { Event } from '../state/Event';

const materialItemsSelector = (state: AppState): any => state.materials.items;
const mailSelector = (state: AppState): any => state.mail;
const usersSelector = (state: AppState): DataState<User> => state.users;
const eventsSelector = (state: AppState): DataState<Event> => state.events;

export const getMaterialChartItems = createSelector(materialItemsSelector, (items: any[]) => {
    const categories = _.groupBy(items, x => x.category);
    const data = _.keys(categories).map(category => ({ name: category, value: categories[category].length, fill: randomColor() }));

    return data;
});

export const getMailitems = createSelector(mailSelector, (mail: any) => {
    return _.sortBy(mail.items.map((item: any) => 
    _.assign({}, item, {createdAt: moment(item.createdAt)}), (i: any) => i.createdAt));
});

export const getUsers = createSelector(usersSelector, (users: DataState<User>) => {
    return users;
});

export const getEvents = createSelector(eventsSelector, (events: DataState<Event>) => {
    const selectedId = events.selectedId;
    if (selectedId) {
        events = events.set(DataState.SELECTION, events.items.get(selectedId)) as DataState<Event>;
    }

    return events;
});