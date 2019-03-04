import { Moment } from 'moment';

export interface IWeeklyRecurringEvent {
    id?: number;
    dayOfWeek?: number;
    start?: Moment;
    end?: Moment;
}

export class WeeklyRecurringEvent implements IWeeklyRecurringEvent {
    constructor(public id?: number, public dayOfWeek?: number, public start?: Moment, public end?: Moment) {}
}
