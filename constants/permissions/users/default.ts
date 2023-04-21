/*    Imports    */
import CActionPermission from "../../../types/classes/permission/CActionPermission";

// Set create permissions for the 'users' collection for the 'Default' role
const createPermission = new CActionPermission("create");
createPermission.allowed = true;
createPermission.immutableprops = ["_id", "owner", "status", "draft", "deleted", "jobcount", "eventcount", "authid"]; // Define the properties that can't be updated by 'Default' role
createPermission.hiddenprops = ["__v", "deleted", "authid"]; // Define the properties dont't need send  to the client

// Set read permissions for the 'users' collection for the 'Default' role
const readPermission = new CActionPermission("read");
readPermission.allowed = false;

// Set update permissions for the 'users' collection for the 'Default' role
const updatePermission = new CActionPermission("update");
updatePermission.allowed = false;

// Set delete permissions for the 'users' collection for the 'Default' role
const deletePermission = new CActionPermission("delete");
deletePermission.allowed = false;

export default { createPermission, readPermission, updatePermission, deletePermission };
