import { Model } from "./Helpers";
const moment = require("moment");

export interface ISearchQuery {
    fromDate?: Date;
    toDate?: Date;
    text?: string;
    minFee?: number;
    maxFee?: number;
    location?: string[];
    drawable?: boolean;
}

const SearchQueryModel = Model<ISearchQuery>({
    fromDate: new Date(),
    toDate: moment().add(100, 'year').toDate(),
    text: null,
    minFee: 0,
    maxFee: 1000000,
    location: null,
    drawable: null
});

export class SearchQuery extends SearchQueryModel {
    public static FROM_DATE = 'fromDate';
    public static TO_DATE = 'toDate';
    public static TEXT = 'text';
    public static MIN_FEE = 'minFee';
    public static MAX_FEE = 'maxFee';
    public static LOCATION = 'location';
    public static DRAWABLE = 'drawable';

    public fromDate: Date;
    public toDate: Date;
    public text: string;
    public minFee: number;
    public maxFee: number;
    public location: string[];
    public drawable: boolean;

    public get saveable() {
        return {
            fromDate: moment(this.fromDate).unix(),
            toDate: moment(this.toDate).unix(),
            text: this.text,
            minFee: this.minFee,
            maxFee: this.maxFee,
            location: this.location,
            drawable: this.drawable
        }
    }
}