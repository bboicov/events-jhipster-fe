import { IEvent } from 'app/shared/model/event.model';
import { IUser } from 'app/core/user/user.model';

export interface ICompany {
    id?: number;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
    longitude?: number;
    latitude?: number;
    tags?: string;
    description?: string;
    events?: IEvent[];
    user?: IUser;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public phone?: string,
        public longitude?: number,
        public latitude?: number,
        public tags?: string,
        public description?: string,
        public events?: IEvent[],
        public user?: IUser
    ) {}
}
