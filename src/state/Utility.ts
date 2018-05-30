import { Model } from "./Helpers";

export interface IUtility {
    drawerOpen?: boolean;
}

export const UtilityModel = Model<IUtility>({
    drawerOpen: false
});

export class Utility extends UtilityModel {
    public static DRAWER_OPEN = 'drawerOpen';

    public drawerOpen: boolean;
}
