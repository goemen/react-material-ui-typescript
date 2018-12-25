import { Model } from "./Helpers";
import { Alert } from './Alert';
import { Spinner } from "./Spinner";

export interface IUtility {
    drawerOpen?: boolean;
    alert?: Alert;
    spinner?: Spinner;
    appLoading?: boolean;
    anchorEl?: any;
    notificationEl?: any;
    title?: string;
}

export const UtilityModel = Model<IUtility>({
    drawerOpen: false,
    alert: null,
    spinner: null,
    appLoading: true,
    anchorEl: null,
    notificationEl: null,
    title: process.env.REACT_APP_APPNAME
});

export class Utility extends UtilityModel {
    public static DRAWER_OPEN = 'drawerOpen';
    public static ALERT = 'alert';
    public static SPINNER = 'spinner';
    public static APP_LOADING = 'appLoading';
    public static ANCHOR_EL = 'anchorEl';
    public static NOTIFICATION_EL = 'notificationEl';
    public static TITLE = 'title';

    public drawerOpen: boolean;
    public alert: Alert;
    public spinner: Spinner;
    public appLoading: boolean;
    public anchorEl: any;
    public notificationEl: any;
    public title: string;
}
