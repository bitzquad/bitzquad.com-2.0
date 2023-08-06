/*    Imports    */
import CActionPermission from "../../../types/classes/permission/CActionPermission";
import EApprovalState from "../../../types/enum/_common/EApprovalState";

// Set create permissions for the 'users' collection for the 'Admin' role
const createPermission = new CActionPermission("create");
createPermission.allowed = true;
createPermission.immutableprops = ["_id", "deleted"]; // Define the properties that can't be updated by 'Admin' role
createPermission.hiddenprops = ["__v", "deleted"]; // Define the properties dont't need send  to the client

// Set read permissions for the 'users' collection for the 'Admin' role
const readPermission = new CActionPermission("read");
readPermission.allowed = false;

// Set update permissions for the 'users' collection for the 'Admin' role
const updatePermission = new CActionPermission("update");
updatePermission.allowed = false;

// Set delete permissions for the 'users' collection for the 'Admin' role
const deletePermission = new CActionPermission("delete");
deletePermission.allowed = false;

export default { createPermission, readPermission, updatePermission, deletePermission };
