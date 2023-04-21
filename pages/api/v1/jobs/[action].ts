/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
//import mongodb from "../../../../constants/mongodb";
import apiauthresolver from "../../../../constants/apiauthresolver";
import fetcher from "../../../../constants/fetch/job";
import EUsertype from "../../../../types/enum/_common/EUsertype";

// TODO: Change the 'usertype' and the 'userid' and and check the permissions
let userType = EUsertype.default; // Collection type
let userId = ""; // User id

const noAccessUserTypes = [
    EUsertype.default,
    EUsertype.signed,
    EUsertype.regular,
    EUsertype.newswriter,
    EUsertype.newsadmin,
    EUsertype.blogwriter,
    EUsertype.blogadmin,
    EUsertype.blognewsadmin,
];
const fullAccessUserTypes = [EUsertype.adminmod, EUsertype.admin, EUsertype.superadmin];

/*  API Route Handler   */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const authresp = apiauthresolver.resolveToken(req, res); // Resolve the user type & id4
    if (authresp.success) {
        userType = authresp.user.status;
        userId = authresp.user.id;
    }
    if (noAccessUserTypes.includes(userType)) return res.status(403).json({ error: "Forbidden" }); // Check if the obj has the permission to read the collection
    switch (req.method) {
        case "POST":
            await handlePOST(req, res); // Handle POST requests
            break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}

/*  Handle HTTP POST Actions    */
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const action = req.query.action;
    switch (action) {
        case "check":
            await handleCheck(req, res); // Handle Check requests
            break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}

async function handleCheck(req: NextApiRequest, res: NextApiResponse) {
    try {
        const qualityres = await fetcher.check(req.body.description, () => {});
        if (qualityres.statusCode >= 200 && qualityres.statusCode < 300) {
            const wc = JSON.parse(qualityres.body);

            let resp = { ...wc, quality: calculateQuality(wc) };
            if (!fullAccessUserTypes.includes(userType)) {
                resp.masculine_coded_words = undefined;
                resp.feminine_coded_words = undefined;
                resp.result = undefined;
            }
            return res.status(200).json(resp);
        }
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
