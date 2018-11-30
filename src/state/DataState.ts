import { Map } from 'immutable';
import { Model } from './Helpers';

interface IDataState {
    items: Map<string, any>;
    loading?: boolean;
    doneLoading?: boolean;
}

const DataStateModel = Model<IDataState>({
    items: Map<string, any>(),
    loading: false,
    doneLoading: false
});

export class DataState<M> extends DataStateModel {
    public static ITEMS = 'items';
    public static LOADING = 'loading';
    public static DONE_LOADING = 'doneLoading';

    public items: Map<string, M>;
    public loading?: boolean;
    public doneLoading?: boolean;
}
