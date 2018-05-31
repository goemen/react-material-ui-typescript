import { Model } from "./Helpers";

interface IAlertButtonOptions {
    label: string;
    handler: () => void;
}

export interface IAlert {
    title?: string;
    message: string;
    buttons?: IAlertButtonOptions[];
}

export const AlertModel = Model<IAlert>({
    title: null,
    message: null,
    buttons: null
});

export class Alert extends AlertModel {
    public title: string;
    public message: string;
    public buttons: IAlertButtonOptions[];

    constructor(data: IAlert) {
        super(data);
    }
}