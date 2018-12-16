import * as _ from 'lodash';

export const isNotSet = (value: any) => {
    const notSet = _.isNull(value) || _.isUndefined(value) || _.isEmpty(value);
    return notSet;
}