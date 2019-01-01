import { Model } from "./Helpers";
import { IDbEntity } from "./DbEntity";
import { isNotSet } from "../helpers/misc";
import { User } from "./User";
import { Map } from 'immutable';
import { assign } from 'lodash';
const moment = require('moment');

export const DEFAULT_EVENT_PHOTO = 'https://firebasestorage.googleapis.com/v0/b/tomahawk-da413.appspot.com/o/app%2Fmonyakeng.jpg?alt=media&token=fe716745-fe38-4ded-85b2-3514cc60679a';

export type DRAW_INTERVAL = 'week' | 'day' | 'month';

export interface IEvent extends IDbEntity {
    id: string;
    title?: string;
    description?: string;
    price?: number
    closed?: boolean;
    location?: string;
    date?: Date;
    photo?: string;
    createdBy?: User;
    attendancy?: Map<string, User>;
    drawRate: DRAW_INTERVAL,
    ticketsCountPerDraw: number;
    lastDrawDate?: Date;
    nextDraw?: Date;
    firstDraw: Date;
}

const EventModel = Model<IEvent>({
    id: null,
    title: null,
    description: null,
    closed: false,
    location: null,
    price: 0,
    photo: DEFAULT_EVENT_PHOTO,
    date: new Date(),
    createdBy: null,
    attendancy: Map<string, User>(),
    drawRate: 'day',
    ticketsCountPerDraw: 0,
    lastDrawDate: new Date(),
    firstDraw: new Date(),
    nextDraw: null
});

interface IDrawSettings {
    rate: DRAW_INTERVAL;
    drawTicketCount: number;
    lastDrawDate: Date;
    firstDraw: Date;
    nextDraw: Date;
}

export class Event extends EventModel implements IEvent {
    public static ID = 'id';
    public static TITLE = 'title';
    public static DESCRIPTION = 'description';
    public static PRICE = 'price';
    public static CLOSED = 'closed';
    public static DATE = 'date';
    public static PHOTO = "photo";
    public static LOCATION = 'location';
    public static DRAW_RATE = 'drawRate';
    public static DRAW_TICKET_COUNT = 'ticketsCountPerDraw';
    public static LAST_DRAW_DATE = 'lastDrawDate';
    public static FIRST_DRAW_DATE = 'firstDraw';
    public static NEXT_DRAW = 'nextDraw';

    public id: string;
    public title: string;
    public description: string;
    public price: number
    public closed: boolean;
    public photo: string;
    public location: string;
    public date: Date;
    public createdBy: User;
    public attendancy: Map<string, User>;
    public drawRate: DRAW_INTERVAL;
    public ticketsCountPerDraw: number;
    public lastDrawDate: Date;
    public nextDraw: Date;
    public firstDraw: Date;

    constructor(data?: any) {
        super(data ? assign(
            {},
            data,
            {
                ticketsCountPerDraw: parseInt(data.ticketsCountPerDraw),
                date: data.date ? Event.setDate(data.date) : new Date(),
                firstDraw: data.firstDraw ? Event.setDate(data.firstDraw) : new Date(),
                lastDrawDate: data.lastDrawDate ? Event.setDate(data.lastDrawDate) : new Date(),
                nextDraw: data.nextDraw ? Event.setDate(data.nextDraw) : new Date()
            }
        ) : {});
    }

    private static setDate(value: any) {
        if (value instanceof Date) {
            return value;
        } else if (typeof value === 'string') {
            return moment(value).toDate();
        } else if (typeof value.toDate === 'function') {
            return value.toDate();
        } else if (typeof value === 'number') {
            return moment(value * 1000).toDate();
        }else {
            return new Date()
        }
    }

    public get drawSettings(): IDrawSettings {
        return {
            rate: this.drawRate,
            drawTicketCount: this.ticketsCountPerDraw,
            lastDrawDate: this.lastDrawDate,
            firstDraw: this.firstDraw,
            nextDraw: this.nextDraw
        }
    }

    public get ticketDrawable(): boolean {
        return this.drawSettings.drawTicketCount > 0 && !moment(this.nextDraw).isAfter(moment(this.lastDrawDate));
    }

    public toSaveable(preserveId: boolean = false) {
        const data = this.toJS();
        if (!preserveId) {
            delete data.id;
        }
    
        delete data.createdBy;
        delete data.attendancy;

        data.date = moment(data.date).toDate();
        data.firstDraw = moment(data.firstDraw).toDate();
        data.nextDraw = moment(data.nextDraw).toDate();
        data.nextDraw = moment(data.nextDraw).toDate();
        data.lastDrawDate = moment(data.lastDrawDate).toDate();
        return data;
    }

    public get valid(): boolean {
        return !isNotSet(this.title) &&
        !isNotSet(this.description) &&
        !isNotSet(this.location) &&
        !isNotSet(this.date);
    }

    public isUserGoing(id: string): boolean {
        return this.attendancy.has(id);
    }
}