import { IUser } from 'app/core/user/user.model';
import { IAddress } from 'app/shared/model//address.model';
import { ICompanyGroup } from 'app/shared/model//company-group.model';

export interface IUserInfo {
    id?: number;
    description?: string;
    user?: IUser;
    address?: IAddress;
    companyGroups?: ICompanyGroup[];
}

export class UserInfo implements IUserInfo {
    constructor(
        public id?: number,
        public description?: string,
        public user?: IUser,
        public address?: IAddress,
        public companyGroups?: ICompanyGroup[]
    ) {}
}
