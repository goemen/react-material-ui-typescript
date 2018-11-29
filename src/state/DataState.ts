import { Map } from 'immutable';
import { Model } from './Helpers';
import { User } from './User';

interface IDataState {
    items: Map<string, User>;
    loading?: boolean;
    doneLoading?: boolean;
}

const DataStateModel = Model<IDataState>({
    items: null,
    loading: false,
    doneLoading: false
});

export class DataState extends DataStateModel {
    public static ITEMS = 'items';
    public static LOADING = 'loading';
    public static DONE_LOADING = 'doneLoading';

    public items: Map<string, User>;
    public loading?: boolean;
    public doneLoading?: boolean;
}