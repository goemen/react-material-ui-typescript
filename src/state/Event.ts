import { Model } from "./Helpers";
import { IDbEntity } from "./DbEntity";

export interface IEvent extends IDbEntity {
    id: string;
    title?: string;
    description?: string;
    price?: number
    closed?: boolean;
    date?: Date;
    photo?: string;
}

const EventModel = Model<IEvent>({
    id: null,
    title: null,
    description: null,
    closed: false,
    price: 0,
    photo: null,
    date: null
});

export class Event extends EventModel implements IEvent {
    public static ID = 'id';
    public static TITLE = 'title';
    public static DESCRIPTION = 'description';
    public static PRICE = 'price';
    public static CLOSED = 'closed';
    public static DATE = 'date';
    public static PHOTO = "photo";

    public id: string;
    public title: string;
    public description: string;
    public price: number
    public closed: boolean;
    public photo: string;
    public date: Date;

    public toSaveable() {
        const data = this.toJS();
        delete data.id;
        return data;
    }
}