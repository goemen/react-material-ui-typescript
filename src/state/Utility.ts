import { Model } from "./Helpers";
import { Alert } from './Alert';
import { Spinner } from "./Spinner";

export interface IUtility {
    drawerOpen?: boolean;
    alert?: Alert;
    spinner?: Spinner;
}

export const UtilityModel = Model<IUtility>({
    drawerOpen: false,
    alert: null,
    spinner: null
});

export class Utility extends UtilityModel {
    public static DRAWER_OPEN = 'drawerOpen';
    public static ALERT = 'alert';
    public static SPINNER = 'spinner';

    public drawerOpen: boolean;
    public alert: Alert;
    public spinner: Spinner;
}
