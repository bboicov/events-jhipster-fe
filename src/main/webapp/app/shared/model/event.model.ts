import { ICompany } from 'app/shared/model//company.model';

export interface IEvent {
    id?: number;
    description?: string;
    duration_min?: number;
    name?: string;
    companies?: ICompany[];
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public description?: string,
        public duration_min?: number,
        public name?: string,
        public companies?: ICompany[]
    ) {}
}
