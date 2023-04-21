/*    Imports    */
import EUsertype from "../../enum/_common/EUsertype";
import CCollectionAccess from "./CCollectionAccess";
// class that stores information about permission for a user role for single endpoint
export default class CRolePermission {
    role: EUsertype = EUsertype.default;
    collections: { [key: string]: CCollectionAccess<any> } = {};
}
