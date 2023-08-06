// class that stores permission information about each an every single action for a user for single endpoint
export default class CActionPermission {
    action: string = "";
    allowed: boolean = false;
    immutableprops: string[] = [];
    hiddenprops: string[] = [];
    resolve(searchquery: any, args: any[] = []): { [key: string]: any } {
        return {};
    }
    constructor(action: string) {
        this.action = action;
    }
}
