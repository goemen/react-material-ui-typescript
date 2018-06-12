import { AppState } from '../state/AppState';
import { createSelector } from 'reselect';
const randomColor = require('randomcolor');
import * as _ from 'lodash';

const materialItemsSelector = (state: AppState) => state.materials.items;

export const getMaterialChartItems = createSelector(materialItemsSelector, (items: any[]) => {
    const categories = _.groupBy(items, x => x.category);
    const data = _.keys(categories).map(category => ({ name: category, value: categories[category].length, fill: randomColor() }));

    return data;
});