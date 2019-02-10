import { ICompany } from 'app/shared/model//company.model';
import { IUserInfo } from 'app/shared/model//user-info.model';

export interface ICompanyGroup {
    id?: number;
    name?: string;
    contact_email?: string;
    contact_phone?: string;
    companies?: ICompany[];
    userInfos?: IUserInfo[];
}

export class CompanyGroup implements ICompanyGroup {
    constructor(
        public id?: number,
        public name?: string,
        public contact_email?: string,
        public contact_phone?: string,
        public companies?: ICompany[],
        public userInfos?: IUserInfo[]
    ) {}
}
