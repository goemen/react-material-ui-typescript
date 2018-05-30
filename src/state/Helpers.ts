import { Record } from 'immutable';

export const Model = <T>(data: T): Record.Class => {
    return Record(data);
};