export interface IAddress {
    id?: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
    longitude?: number;
    latitude?: number;
    description?: string;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public address?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public phone?: string,
        public longitude?: number,
        public latitude?: number,
        public description?: string
    ) {}
}
