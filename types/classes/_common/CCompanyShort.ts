/*    Imports    */
import CImage from "./CImage";

// class that stores information about user in short
export default class CCompanyShort {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    thumbnail?: CImage;
    owner?: string;
    // TDOD : Add company details
}
