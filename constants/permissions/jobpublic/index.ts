/*    Imports    */
import CCollectionAccess from "../../../types/classes/permission/CCollectionAccess";
import CJob from "../../../types/classes/job/CJob";

import defaultuser from "./default";

// Create permission object for the 'jobpublic' collection for the 'Default' role
const defaultCollectionAccess = new CCollectionAccess<CJob>();
defaultCollectionAccess.collection = "jobpublic";
defaultCollectionAccess.read = defaultuser.readPermission;
defaultCollectionAccess.create = defaultuser.createPermission;
defaultCollectionAccess.update = defaultuser.updatePermission;
defaultCollectionAccess.delete = defaultuser.deletePermission;

export default {
    default: defaultCollectionAccess,
    admin: defaultCollectionAccess,
};
