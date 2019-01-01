import { IDbEntity } from "./DbEntity";
import { Model } from "./Helpers";
const moment = require('moment');
import * as _ from 'lodash';

export interface ITicketDraw extends IDbEntity {
    code: number;
    event?: Event;
    eventId: string;
    userId: string;
    drawDate: Date;
    dateEntered: Date;
    winner?: boolean;
}

const TicketDrawModel = Model<ITicketDraw>({
    id: null,
    event: null,
    eventId: null,
    userId: null,
    dateEntered: null,
    code: null,
    drawDate: null,
    winner: false
});

export class TicketDraw extends TicketDrawModel {
    public static ID = 'id';
    public static EVENT = 'event';
    public static EVENT_ID = 'eventId';
    public static CODE = 'code';
    public static USER_ID = 'userId';
    public static DRAW_DATE = 'drawDate';
    public static DATE_ENTERED = 'dateEntered';
    public static WINNER = 'winner';

    public code: number;
    public event: Event;
    public eventId: string;
    public userId: string;
    public drawDate: Date;
    public dateEntered: Date;
    public winner: boolean;

    constructor(data: any) {
        super(_.assign({}, data, {dateEntered: data.dateEntered ? moment(data.dateEntered * 1000).toDate() : null,
            drawDate: data.drawDate ? moment(data.drawDate * 1000).toDate() : null}));
    }

    public isForEvent(eventId: string): boolean {
        return eventId === this.eventId;
    }

    public get isFutureDrawable(): boolean {
        return moment(this.drawDate).isAfter(moment());
    }
}