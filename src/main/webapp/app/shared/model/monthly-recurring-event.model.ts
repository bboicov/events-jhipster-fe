import { Moment } from 'moment';

export interface IMonthlyRecurringEvent {
    id?: number;
    dayOfMonth?: number;
    start?: Moment;
    end?: Moment;
}

export class MonthlyRecurringEvent implements IMonthlyRecurringEvent {
    constructor(public id?: number, public dayOfMonth?: number, public start?: Moment, public end?: Moment) {}
}
