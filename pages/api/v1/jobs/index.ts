/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../../../constants/mongodb";
import queryparser from "../../../../constants/queryparser";
import Schema from "../../../../types/schema/job/SJob";

import permissions from "../../../../constants/hooks/getPermissions";
import EUsertype from "../../../../types/enum/_common/EUsertype";
import EApprovalState from "../../../../types/enum/_common/EApprovalState";

import fetcher from "../../../../constants/fetch/job";
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
        case "PATCH":
            await handlePATCH(req, res); // Handle PATCH requests
            break;
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
        var p = permissions.getUserCollectionPermission(userType, "jobs"); // Get the permissions for the current obj
        if (!p.read.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to read the collection

        const query = queryparser.Parse(req); // Parse the query string
        let propfilter = p.resolveAndGetMongoSelectQuery(p.read, query.select); // Sanitize the query string according to the permissions
        let searchfilter = p.read.resolve({ ...query.search, invokerid: userId }); // Sanitize the search query requesting from the cliet side & check the permissions
        if ((req.query.count && req.query.count === "true") || (req.query.countonly && req.query.countonly === "true")) count = await Schema.countDocuments({ ...searchfilter }); // Get the count of the data
        if (!req.query.countonly || req.query.countonly === "false") resp = await Schema.find({ ...searchfilter }, { ...propfilter }, query.options); // Execute the query

        return res.status(200).json({ values: resp, count: count, itemsperpage: query.options.limit, page: query.options.page });
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP POST Actions    */
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "jobs"); // Get the permissions for the current obj
        if (!p.create.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to create the collection
        let obj = p.resolveObject(req.body, p.create); // Sanitize the request body
        obj.owner = userId; // Set the owner of the obj
        obj.status = EApprovalState.pending; // Set the status to pending
        const qualityres = await fetcher.check(obj.content, () => {});
        if (qualityres.statusCode >= 200 && qualityres.statusCode < 300) {
            const wc = JSON.parse(qualityres.body);
            obj.quality = calculateQuality(wc);
        }
        const resp = await Schema.create({ ...obj, draft: req.query.draft === "true" }); // Create the obj

        return res.status(200).json(p.resolveObjectArray(resp, p.create.hiddenprops)); // Return the sanitized obj
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP PUT Actions    */
async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "jobs"); // Get the permissions for the current obj
        if (!p.update.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to update the collection

        let filter = p.update.resolve({ _id: req.body._id, invokerid: userId }); // Check the permissions & sanitize the request body
        let obj = p.resolveObject(req.body, p.update); // Sanitize the request body
        const qualityres = await fetcher.check(obj.content, () => {});
        if (qualityres.statusCode >= 200 && qualityres.statusCode < 300) {
            const wc = JSON.parse(qualityres.body);
            obj.quality = calculateQuality(wc);
        }
        const resp = await Schema.updateOne({ ...filter }, { ...obj, draft: req.query.draft === "true" }, { new: true }); // Update the obj

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP DELETE Actions    */
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "jobs"); // Get the permissions for the current obj
        if (!p.delete.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to delete the collection

        let filter = p.delete.resolve({ ids: req.body.ids, invokerid: userId }); // Check the permissions
        const resp = req.body.permanent ? await Schema.deleteMany({ ...filter }) : await Schema.updateMany({ ...filter }, { $set: { deleted: true } }); // Delete the obj

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

/*  Handle HTTP PATCH Actions    */
async function handlePATCH(req: NextApiRequest, res: NextApiResponse) {
    await mongodb.Connect();
    try {
        var p = permissions.getUserCollectionPermission(userType, "jobs"); // Get the permissions for the current obj
        if (!p.update.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to update the collection
        const query = queryparser.Parse(req); // Parse the query string
        let filter = p.update.resolve({ ...query.search, invokerid: userId }); // Check the permissions & sanitize the request body
        let obj = p.resolveObject(req.body, p.update); // Sanitize the request body
        const resp = await Schema.updateMany({ ...filter }, { ...obj, draft: req.query.draft === "true" }, { new: true }); // Update the obj

        return res.status(200).json(resp);
    } catch (e: any) {
        return res.status(500).json({ error: e?.message });
    }
}

function calculateQuality(resp: any) {
    let q = 100;
    switch (resp.result) {
        case "neutral":
            q -=
                resp?.masculine_coded_words.length > resp?.feminine_coded_words.length
                    ? (resp?.masculine_coded_words.length - resp?.feminine_coded_words.length) * 3
                    : (resp?.feminine_coded_words.length - resp?.masculine_coded_words.length) * 3;
            break;
        default:
            q -= (resp?.masculine_coded_words.length + resp?.feminine_coded_words.length) * 3;
    }
    return q;
}
