import { reducers } from './../reducers/CombinedReducers';
import { createStore } from 'redux'

export const store = createStore(reducers);