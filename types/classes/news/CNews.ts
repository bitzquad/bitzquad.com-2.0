/*    Imports    */
import EApprovalState from "../../enum/_common/EApprovalState";
import CImage from "../_common/CImage";
import CLink from "../_common/CLink";

// class that stores information about news
export default class CNews {
    id?: string;
    name?: string;
    description?: string;
    content?: string;

    category?: string;
    thumbnail?: CImage;
    social?: CLink[];

    status: EApprovalState = EApprovalState.default;
    featured: boolean = false;
    owner?: string;

    draft: boolean = false;
    deleted: boolean = false;
    createdAt: string = new Date().toISOString();
    updatedAt: string = new Date().toISOString();
}
