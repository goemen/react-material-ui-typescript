import { Model } from "./Helpers";
import { IDbEntity } from "./DbEntity";
import { isNotSet } from "src/helpers/misc";

export interface IEvent extends IDbEntity {
    id: string;
    title?: string;
    description?: string;
    price?: number
    closed?: boolean;
    location?: string;
    date?: Date;
    photo?: string;
}

const EventModel = Model<IEvent>({
    id: null,
    title: null,
    description: null,
    closed: false,
    location: null,
    price: 0,
    photo: null,
    date: new Date()
});

export class Event extends EventModel implements IEvent {
    public static ID = 'id';
    public static TITLE = 'title';
    public static DESCRIPTION = 'description';
    public static PRICE = 'price';
    public static CLOSED = 'closed';
    public static DATE = 'date';
    public static PHOTO = "photo";
    public static LOCATION = 'location';

    public id: string;
    public title: string;
    public description: string;
    public price: number
    public closed: boolean;
    public photo: string;
    public location: string;
    public date: Date;


    public toSaveable() {
        const data = this.toJS();
        delete data.id;
        return data;
    }

    get valid(): boolean {
        return !isNotSet(this.title) &&
        !isNotSet(this.description) &&
        !isNotSet(this.location) &&
        !isNotSet(this.date);
    }
}