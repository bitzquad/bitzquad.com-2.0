/*    Imports    */
import CAddress from "../_common/CAddress";
import CImage from "../_common/CImage";
import CRegistration from "../_common/CRegistration";
import CLink from "../_common/CLink";
import CSalary from "./CSalary";
import EApprovalState from "../../enum/_common/EApprovalState";
import CCompanyShort from "../_common/CCompanyShort";

// class that stores information about job
export default class CJob {
    _id?: string;
    name?: string;
    description?: string;
    content?: string;

    salary?: CSalary;
    category?: string;
    jobtype?: string;
    seniority?: string;
    industry?: string;
    experience?: string;
    workplace?: string;
    education?: string;

    quality: number = 0;
    vacent: boolean = true;
    urgent: boolean = true;
    candidatescount: number = 1;

    place?: CAddress;
    thumbnail?: CImage;

    company?: CCompanyShort;

    social?: CLink[];
    registration?: CRegistration;
    tags?: string[];

    status: EApprovalState = EApprovalState.default;
    featured: boolean = false;
    owner?: string;

    draft: boolean = false;
    deleted: boolean = false;
    createdAt: string = new Date().toISOString();
    updatedAt: string = new Date().toISOString();

    isResgisationOpen(): boolean {
        if (!this.registration) return false;
        if (this.registration.open && (this.registration.hasstarttime || this.registration.hasendtime)) {
            if (this.registration.hasstarttime && this.registration.time) {
                if (new Date(this.registration.time.starttime).getTime() > new Date().getTime()) return false;
            }
            if (this.registration.hasendtime && this.registration.time) {
                if (new Date(this.registration.time.endtime).getTime() < new Date().getTime()) return false;
            }
            return true;
        } else return this.registration.open;
    }

    calculateTimeToRegistrationStart(): Date {
        if (!this.registration) return new Date(0o1, 0, 0);
        if (!this.registration.time) return new Date(0o1, 0, 0);
        return new Date(new Date(this.registration.time.starttime).getTime() - new Date().getTime());
    }

    calculateTimeToRegistrationEnd(): Date {
        if (!this.registration) return new Date(0o1, 0, 0);
        if (!this.registration.time) return new Date(0o1, 0, 0);
        return new Date(new Date(this.registration.time.endtime).getTime() - new Date().getTime());
    }
}
