/*    Imports    */
import CName from "../_common/CName";

// class that stores information about contact us requests
export default class CContact {
    _id?: string;
    name?: CName;
    email?: string;
    phone?: string;
    title?: string;
    message?: string;

    draft: boolean = false;
    deleted: boolean = false;
    createdAt: string = new Date().toISOString();
    updatedAt: string = new Date().toISOString();
}
