import { Moment } from 'moment';

export interface IOneTimeEvent {
    id?: number;
    when?: Moment;
}

export class OneTimeEvent implements IOneTimeEvent {
    constructor(public id?: number, public when?: Moment) {}
}
