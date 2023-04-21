/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";
import CContact from "../../../types/classes/contact/CContact";

import defaultuser from "./default";
import admin from "./admin";

// Create permission object for the 'contact' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CContact>();
defaultCollectionAccess.collection = "contact";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

// Create permission object for the 'contact' collection for the 'Admin' role
const adminCollectionAccess = new CCollectionAccess<CContact>();
adminCollectionAccess.collection = "contact";
adminCollectionAccess.read = admin.readPermission;
adminCollectionAccess.create = admin.createPermission;
adminCollectionAccess.update = admin.updatePermission;
adminCollectionAccess.delete = admin.deletePermission;


export default {
    default: defaultCollectionAccess,
    admin: adminCollectionAccess,
};
