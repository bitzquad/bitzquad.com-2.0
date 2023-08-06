import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            handleGET(req, res); // Handle GET requests
            break;
        case "POST":
            handlePOST(req, res); // Handle POST requests
            break;
        case "DELETE":
            handleDELETE(req, res); // Handle DELETE requests
            break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    try {
        var paramsgimage = {
            Bucket: process.env.BUCKET_NAME || "",
            Key: req.query.key?.toString() || "",
        };
        s3.getObject(paramsgimage).createReadStream().pipe(res);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const fname = req.query.fname;
    try {
        switch (fname) {
            case "upload":
                var params = {
                    Bucket: process.env.BUCKET_NAME,
                    Fields: {
                        key: req.query.key?.toString() || "",
                    },
                    Expires: 60, // seconds
                    Conditions: [
                        ["content-length-range", 0, 1024 * 1024 * 10], // up to 10 MB
                    ],
                };
                const post = s3.createPresignedPost(params);
                res.status(200).json(post);
                break;
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
    const fname = req.query.fname;
    try {
        switch (fname) {
            case "remove":
                var params = {
                    Bucket: process.env.BUCKET_NAME || "",
                    Key: req.query.key?.toString() || "",
                };
                s3.deleteObject(params, (err, data) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({ success: true, data });
                    }
                });

                break;
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}
