export interface IConfig {
    id?: number;
    key?: string;
    value?: string;
    authority?: string;
}

export class Config implements IConfig {
    constructor(public id?: number, public key?: string, public value?: string, public authority?: string) {}
}
