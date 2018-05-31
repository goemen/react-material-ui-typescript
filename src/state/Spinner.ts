import { Model } from "./Helpers";

export interface ISpinner {
    message: string;
}

export const SpinnerModel = Model<ISpinner>({
    message: null
});

export class Spinner extends SpinnerModel {
    public static MESSAGE = 'message';
    
    public message: string;
}