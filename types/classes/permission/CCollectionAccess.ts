/*    Imports    */
import CActionPermission from "./CActionPermission";
import { filterObject } from "../../../constants/objectfilter";
// class that stores permission information about each an every action for a user for single endpoint
export default class CCollectionAccess<T> {
    collection?: string;

    create: CActionPermission = new CActionPermission("create");
    read: CActionPermission = new CActionPermission("read");
    update: CActionPermission = new CActionPermission("update");
    delete: CActionPermission = new CActionPermission("delete");

    resolveObject(data: T, action: CActionPermission): T {
        switch (action.action) {
            case "create":
                data = filterObject(data, action.immutableprops);
                break;
            case "read":
                data = filterObject(data, action.hiddenprops);
                break;
            case "update":
                data = filterObject(data, action.immutableprops);
                break;
            case "delete":
                data = filterObject(data, action.immutableprops);
                data = filterObject(data, action.hiddenprops);
                break;
        }
        return data;
    }
    resolveObjectArray(data: T, props: string[]): T {
        return filterObject(data, props);
    }
    resolveAndGetMongoSelectQuery(action: CActionPermission, selectquery: any): { [key: string]: number } {
        let query: { [key: string]: number } = {};
        switch (action.action) {
            case "create":
                for (let prop in action.immutableprops) {
                    query[action.immutableprops[prop]] = 0;
                }
                break;
            case "read":
                for (let prop in action.hiddenprops) {
                    query[action.hiddenprops[prop]] = 0;
                }
                break;
            case "update":
                for (let prop in action.immutableprops) {
                    query[action.immutableprops[prop]] = 0;
                }
                break;
            case "delete":
                for (let prop in action.hiddenprops) {
                    query[action.hiddenprops[prop]] = 0;
                }
                for (let prop in action.immutableprops) {
                    query[action.immutableprops[prop]] = 0;
                }
                break;
        }
        if (selectquery && Object.keys(selectquery).length > 0) {
            const queryfilterin = Object.keys(selectquery).filter((x) => Object.keys(query).includes(x));
            const queryfilternotin = Object.keys(selectquery).filter((x) => !Object.keys(query).includes(x));
            if (queryfilterin.length == 0) {
                query = {};
            }
            if (queryfilternotin.length > 0) {
                for (let i = 0; i < queryfilternotin.length; i++) {
                    query[queryfilternotin[i]] = selectquery[queryfilternotin[i]];
                }
            }
        }
        return query;
    }
}
