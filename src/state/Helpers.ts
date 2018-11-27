import { Record } from 'immutable';

export const Model = <T>(data: T): Record.Class => {
    return Record(data);
};

// const DbEntity = <T extends IDbEntity>(data: T): Record.Class => {
//     return Model(data);
// }

// interface IDbEntity {
//     id: string;
// }

