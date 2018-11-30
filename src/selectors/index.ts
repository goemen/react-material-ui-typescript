import { AppState } from '../state/AppState';
import { createSelector } from 'reselect';
const randomColor = require('randomcolor');
import * as _ from 'lodash';
import * as moment from 'moment';
import { DataState } from '../state/DataState';
import { User } from '../state/User';

const materialItemsSelector = (state: AppState): any => state.materials.items;
const mailSelector = (state: AppState): any => state.mail;
const usersSelector = (state: AppState): DataState<User> => state.users;

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