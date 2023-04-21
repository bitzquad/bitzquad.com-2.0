/*    Imports    */
import CName from "../_common/CName";
import CAddress from "../_common/CAddress";
import CLink from "../_common/CLink";
import CLimit from "../_common/CLimit";
import CImage from "../_common/CImage";
import EUsertype from "../../enum/_common/EUsertype";
// class that stores information about user
export default class CUser {
    _id?: string;
    name?: CName;
    dob: string = new Date(1930, 1, 1).toISOString();
    gender?: string;
    email?: string;
    phone?: string;
    address?: CAddress;

    nationality?: string;
    ethnicity?: string;
    community?: string;

    description?: string;
    content?: string;
    social?: CLink[];
    thumbnail?: CImage;

    status: EUsertype = EUsertype.default;
    authid?: string;

    jobcount: CLimit = new CLimit();
    eventcount: CLimit = new CLimit();

    // TODO: add user working company

    draft: boolean = false;
    deleted: boolean = false;
    createdAt: string = new Date().toISOString();
    updatedAt: string = new Date().toISOString();
}
