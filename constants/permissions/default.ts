/*    Imports    */
import CRolePermission from "../../types/classes/permission/CRolePermission";
import EUsertype from "../../types/enum/_common/EUsertype";

import users from "./users";
import jobs from "./jobs";
import collections from "./collections";
import news from "./news";
import contact from "./contact";
import jobpublic from "./jobpublic";

const permissions = new CRolePermission(); // Create a new permissions object for role 'Default'
permissions.role = EUsertype.default; // Set the role of the permissions object
permissions.collections["users"] = users.default; // Set the permissions for the 'users' collection
permissions.collections["jobs"] = jobs.default; // Set the permissions for the 'jobs' collection
permissions.collections["collections"] = collections.default; // Set the permissions for the 'collections' collection
permissions.collections["news"] = news.default; // Set the permissions for the 'blog' collection
permissions.collections["contact"] = contact.default; // Set the permissions for the 'contact' collection
permissions.collections["jobpublic"] = jobpublic.default; // Set the permissions for the 'jobpublic' collection

export default permissions;
