import { IEvent } from 'app/shared/model//event.model';
import { IAddress } from 'app/shared/model//address.model';
import { ICompanyGroup } from 'app/shared/model//company-group.model';

export interface ICompany {
    id?: number;
    name?: string;
    tags?: string;
    description?: string;
    events?: IEvent[];
    address?: IAddress;
    companyGroup?: ICompanyGroup;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public tags?: string,
        public description?: string,
        public events?: IEvent[],
        public address?: IAddress,
        public companyGroup?: ICompanyGroup
    ) {}
}
