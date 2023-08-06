/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../../../constants/mongodb";
import queryparser from "../../../../constants/queryparser";
import Collection from "../../../../types/schema/collection/SCollection";

import permissions from "../../../../constants/hooks/getPermissions";
import EUsertype from "../../../../types/enum/_common/EUsertype";

import apiauthresolver from "../../../../constants/apiauthresolver";

// TODO: Change the 'usertype' and the 'userid' and and check the permissions
let userType = EUsertype.default; // Collection type
let userId = ""; // User id

/*  API Route Handler   */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authresp = apiauthresolver.resolveToken(req, res); // Resolve the user type & id4
    if (authresp.success) {
        userType = authresp.user.status;
        userId = authresp.user.id;
    }
    switch (req.method) {
        case "GET":
            await handleGET(req, res); // Handle GET requests
            break;
        case "POST":
            await handlePOST(req, res); // Handle POST requests
            break;
        case "PUT":
            await handlePUT(req, res); // Handle PUT requests
            break;
        case "DELETE":
            await handleDELETE(req, res); // Handle DELETE requests
            break;
        // case "PATCH":
        //     await handlePATCH(req, res); // Handle PATCH requests
        //     break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}
/*  Handle HTTP GET Actions    */
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        let count = 0;
        let resp = {};
        var p = permissions.getUserCollectionPermission(userType, "collections"); // Get the permissions for the current collection
        if (!p.read.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the collection has the permission to read the collection

        const query = queryparser.Parse(req); // Parse the query string
        let propfilter = p.resolveAndGetMongoSelectQuery(p.read, query.select); // Sanitize the query string according to the permissions
        let searchfilter = p.read.resolve({ ...query.search, invokerid: userId }); // Sanitize the search query requesting from the cliet side & check the permissions
        if ((req.query.count && req.query.count === "true") || (req.query.countonly && req.query.countonly === "true"))
            count = await Collection.countDocuments({ ...searchfilter }); // Get the count of the data
        if (!req.query.countonly || req.query.countonly === "false") resp = await Collection.find({ ...searchfilter }, { ...propfilter }, query.options); // Execute the query

        return res.status(200).json({ values: resp, count: count, itemsperpage: query.options.limit, page: query.options.page });
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP POST Actions    */
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "collections"); // Get the permissions for the current collection
        if (!p.create.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the collection has the permission to create the collection
        let collection = p.resolveObject(req.body, p.create); // Sanitize the request body

        const resp = await Collection.create({ ...collection, draft: req.query.draft === "true" }); // Create the collection

        return res.status(200).json(p.resolveObjectArray(resp, p.create.hiddenprops)); // Return the sanitized collection
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP PUT Actions    */
async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "collections"); // Get the permissions for the current collection
        if (!p.update.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the collection has the permission to update the collection

        let filter = p.update.resolve({ _id: req.body._id, invokerid: userId }); // Check the permissions & sanitize the request body
        let collection = p.resolveObject(req.body, p.update); // Sanitize the request body
        const resp = await Collection.updateOne({ ...filter }, { ...collection, draft: req.query.draft === "true" }, { new: true }); // Update the collection

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP DELETE Actions    */
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "collections"); // Get the permissions for the current collection
        if (!p.delete.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the collection has the permission to delete the collection

        let filter = p.delete.resolve({ ids: req.body.ids, invokerid: userId }); // Check the permissions
        const resp = req.body.permanent ? await Collection.deleteMany({ ...filter }) : await Collection.updateMany({ ...filter }, { $set: { deleted: true } }); // Delete the collection

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}
