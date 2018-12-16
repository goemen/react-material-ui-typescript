import { Map } from 'immutable';
import { Model } from './Helpers';

interface IDataState {
    items: Map<string, any>;
    loading?: boolean;
    doneLoading?: boolean;
    selection?: any;
    pageIndex: number;
    editSelection: any;
    selectionIndex?: number;
    saveInProgress?: boolean;
}

const DataStateModel = Model<IDataState>({
    items: Map<string, any>(),
    loading: false,
    doneLoading: false,
    selectionIndex: null,
    selection: null,
    pageIndex: 0,
    saveInProgress: false,
    editSelection: null
});

export class DataState<M> extends DataStateModel {
    public static ITEMS = 'items';
    public static LOADING = 'loading';
    public static DONE_LOADING = 'doneLoading';
    public static SELECTION = 'selection';
    public static SELECTION_INDEX = 'selectionIndex';
    public static PAGE_INDEX = 'pageIndex';
    public static SAVE_IN_PROGRESS = 'saveInProgress';

    public items: Map<string, M>;
    public loading: boolean;
    public doneLoading: boolean;
    public selection: M;
    public pageIndex: number;
    public selectionIndex: number;
    public saveInProgress: boolean;
}
