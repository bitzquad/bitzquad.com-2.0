/*    Imports    */
import CRolePermission from "../../types/classes/permission/CRolePermission";
import EUsertype from "../../types/enum/_common/EUsertype";

import users from "./users";
import jobs from "./jobs";
import collections from "./collections";
import news from "./news";
import contact from "./contact";

const permissions = new CRolePermission(); // Create a new permissions object for role 'Admin'
permissions.role = EUsertype.admin; // Set the role of the permissions object
permissions.collections["users"] = users.admin; // Set the permissions for the 'users' collection
permissions.collections["jobs"] = jobs.admin; // Set the permissions for the 'jobs' collection
permissions.collections["collections"] = collections.admin; // Set the permissions for the 'collections' collection
permissions.collections["news"] = news.admin; // Set the permissions for the 'blog' collection
permissions.collections["contact"] = contact.admin; // Set the permissions for the 'contact' collection

export default permissions;
