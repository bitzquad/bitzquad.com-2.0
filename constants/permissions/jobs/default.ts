/*    Imports    */
import CActionPermission from "../../../types/classes/permission/CActionPermission";
import EApprovalState from "../../../types/enum/_common/EApprovalState";

// Set create permissions for the 'jobs' collection for the 'Default' role
const createPermission = new CActionPermission("create");
createPermission.allowed = false;

// Set read permissions for the 'jobs' collection for the 'Default' role
const readPermission = new CActionPermission("read");
readPermission.allowed = false;
readPermission.immutableprops = ["_id", "owner", "status", "featured", "draft", "quality", "deleted"]; // Define the properties that can't be updated by 'Default' role
readPermission.hiddenprops = ["__v", "owner"]; // Define the properties dont't need send  to the client
readPermission.resolve = (query: any): { [key: string]: any } => {
    // Check if the user has the permission to read the collection
    return { ...query, status: EApprovalState.approved, draft: false, deleted: false };
};

// Set update permissions for the 'jobs' collection for the 'Default' role
const updatePermission = new CActionPermission("update");
updatePermission.allowed = false;

// Set delete permissions for the 'jobs' collection for the 'Default' role
const deletePermission = new CActionPermission("delete");
deletePermission.allowed = false;

export default { createPermission, readPermission, updatePermission, deletePermission };
