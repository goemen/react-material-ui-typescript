import { Model } from "./Helpers";
import { Alert } from './Alert';

export interface IUtility {
    drawerOpen?: boolean;
    alert?: Alert;
}

export const UtilityModel = Model<IUtility>({
    drawerOpen: false,
    alert: null
});

export class Utility extends UtilityModel {
    public static DRAWER_OPEN = 'drawerOpen';
    public static ALERT = 'alert';

    public drawerOpen: boolean;
    public alert: Alert;
}
