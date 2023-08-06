// class that stores information about dymamic collection
export default class CCollection {
    id?: string;
    name?: string;
    key?: string;
    ref?: string;
    valuesameaskey: boolean = true;
    valuetype?: string;
    values: any[] = [];
    draft: boolean = false;
    deleted: boolean = false;
}
