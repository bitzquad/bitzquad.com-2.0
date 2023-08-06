/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../../../constants/mongodb";
import queryparser from "../../../../constants/queryparser";
import Schema from "../../../../types/schema/news/SNews";

import permissions from "../../../../constants/hooks/getPermissions";
import EUsertype from "../../../../types/enum/_common/EUsertype";

import apiauthresolver from "../../../../constants/apiauthresolver";

// TODO: Change the 'usertype' and the 'usersid' and and check the permissions
let userType = EUsertype.default; // Collection type
let userId = ""; // User id

/*  API Route Handler   */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authresp = apiauthresolver.resolveToken(req, res); // Resolve the news type & id4
    if (authresp.success) {
        userType = authresp.user.status;
        userId = authresp.user.id;
    }
    switch (req.method) {
        case "GET":
            await handleGET(req, res); // Handle GET requests
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
        var p = permissions.getUserCollectionPermission(userType, "newspublic"); // Get the permissions for the current news
        if (!p.read.allowed) return res.status(403).json({ error: "Forbidden" }); // Check if the news has the permission to read the collection

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
