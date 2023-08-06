/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";
import CUser from "../../../types/classes/user/CUser";

import defaultuser from "./default";
import admin from "./admin";

// Create permission object for the 'users' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CUser>();
defaultCollectionAccess.collection = "users";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

// Create permission object for the 'users' collection for the 'Admin' role
const adminCollectionAccess = new CCollectionAccess<CUser>();
adminCollectionAccess.collection = "users";
adminCollectionAccess.read = admin.readPermission;
adminCollectionAccess.create = admin.createPermission;
adminCollectionAccess.update = admin.updatePermission;
adminCollectionAccess.delete = admin.deletePermission;

export default {
    default: defaultCollectionAccess,
    admin: adminCollectionAccess,
};
