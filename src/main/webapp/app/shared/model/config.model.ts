export interface IConfig {
    id?: number;
    key?: string;
    value?: string;
    authority?: string;
    position?: number;
}

export class Config implements IConfig {
    constructor(public id?: number, public key?: string, public value?: string, public authority?: string, public position?: number) {}
}
