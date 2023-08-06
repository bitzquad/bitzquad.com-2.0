/*    Imports    */
import CActionPermission from "../../../types/classes/permission/CActionPermission";
import EApprovalState from "../../../types/enum/_common/EApprovalState";

// Set create permissions for the 'users' collection for the 'Admin' role
const createPermission = new CActionPermission("create");
createPermission.allowed = false;

// Set read permissions for the 'users' collection for the 'Admin' role
const readPermission = new CActionPermission("read");
readPermission.allowed = true;
readPermission.immutableprops = ["_id", "featured", "status", "owner", "deleted", "draft"]; // Define the properties that can't be updated by 'Admin' role
readPermission.hiddenprops = ["__v", "deleted", "owner"]; // Define the properties dont't need send  to the client
readPermission.resolve = (query: any): { [key: string]: any } => {
    // Check if the user has the permission to read the collection
    return { ...query, status: EApprovalState.approved, draft: false, deleted: false };
};

// Set update permissions for the 'users' collection for the 'Admin' role
const updatePermission = new CActionPermission("update");
updatePermission.allowed = false;

// Set delete permissions for the 'users' collection for the 'Admin' role
const deletePermission = new CActionPermission("delete");
deletePermission.allowed = false;

export default { createPermission, readPermission, updatePermission, deletePermission };
