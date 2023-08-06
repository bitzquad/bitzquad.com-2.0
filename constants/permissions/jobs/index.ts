/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";
import CJob from "../../../types/classes/job/CJob";

import defaultuser from "./default";
import admin from "./admin";

// Create permission object for the 'jobs' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CJob>();
defaultCollectionAccess.collection = "jobs";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

// Create permission object for the 'jobs' collection for the 'Admin' role
const adminCollectionAccess = new CCollectionAccess<CJob>();
adminCollectionAccess.collection = "jobs";
adminCollectionAccess.read = admin.readPermission;
adminCollectionAccess.create = admin.createPermission;
adminCollectionAccess.update = admin.updatePermission;
adminCollectionAccess.delete = admin.deletePermission;

export default {
    default: defaultCollectionAccess,
    admin: adminCollectionAccess,
};
