import { Utility } from './Utility';
import { Model } from "./Helpers";

export interface IAppState {
    utility?: Utility;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility()
});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';

    public utility: Utility;
}