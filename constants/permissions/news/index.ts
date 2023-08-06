/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";
import CNews from "../../../types/classes/news/CNews";

import defaultuser from "./default";
import admin from "./admin";

// Create permission object for the 'news' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CNews>();
defaultCollectionAccess.collection = "news";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

// Create permission object for the 'news' collection for the 'Admin' role
const adminCollectionAccess = new CCollectionAccess<CNews>();
adminCollectionAccess.collection = "news";
adminCollectionAccess.read = admin.readPermission;
adminCollectionAccess.create = admin.createPermission;
adminCollectionAccess.update = admin.updatePermission;
adminCollectionAccess.delete = admin.deletePermission;

export default {
    default: defaultCollectionAccess,
    admin: adminCollectionAccess,
};
