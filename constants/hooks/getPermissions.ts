/*    Imports    */
import CActionPermission from "../../types/classes/permission/CActionPermission";
import CCollectionAccess from "../../types/classes/permission/CCollectionAccess";
import CRolePermission from "../../types/classes/permission/CRolePermission";
import EUsertype from "../../types/enum/_common/EUsertype";

import defaultpermissions from "../permissions/default";
import adminpermissions from "../permissions/admin";


/*  Returns permission object related to given user type    */
const getUserPermission = (userType: EUsertype): CRolePermission => {
    switch (userType) {
        case EUsertype.default:
            return defaultpermissions;
        case EUsertype.admin:
            return adminpermissions;
        default:
            return new CRolePermission();
    }
};
/*  Returns permission object related to given user type & collection  */
const getUserCollectionPermission = (userType: EUsertype, collection: string): CCollectionAccess<any> => {
    return getUserPermission(userType).collections[collection];
};
/*  Returns CRUD action permission object related to given user type & collection  */
const getUserCollectionActionPermission = (userType: EUsertype, collection: string, action: string): CActionPermission => {
    const collectionAccess = getUserCollectionPermission(userType, collection);
    switch (action) {
        case "read":
            return collectionAccess.read;
        case "create":
            return collectionAccess.create;
        case "update":
            return collectionAccess.update;
        case "delete":
            return collectionAccess.delete;
        default:
            return new CActionPermission("err");
    }
};

export default {
    getUserCollectionActionPermission,
    getUserCollectionPermission,
    getUserPermission,
};
