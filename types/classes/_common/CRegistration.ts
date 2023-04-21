/*    Imports    */
import CTime from "./CTime";
// class that stores information about job or event registration
export default class CRegistration {
    open: boolean = false;
    openforpublic: boolean = true;
    hasstarttime: boolean = false;
    hasendtime: boolean = false;
    time?: CTime;
    usesystemform: boolean = false;
    formurl: string = "";
}
