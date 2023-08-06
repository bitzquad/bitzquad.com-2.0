/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";

import CCollection from "../../../types/classes/collection/CCollection";

import defaultuser from "./default";

import admin from "./admin";

// Create permission object for the 'collections' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CCollection>();
defaultCollectionAccess.collection = "collections";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

// Create permission object for the 'collections' collection for the 'Admin' role
const adminCollectionAccess = new CCollectionAccess<CCollection>();
adminCollectionAccess.collection = "collections";
adminCollectionAccess.read = admin.readPermission;
adminCollectionAccess.create = admin.createPermission;
adminCollectionAccess.update = admin.updatePermission;
adminCollectionAccess.delete = admin.deletePermission;

export default {
    default: defaultCollectionAccess,
    admin: adminCollectionAccess,
};
