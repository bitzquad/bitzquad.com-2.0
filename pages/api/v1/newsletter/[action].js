/*  Importings    */
//import { NextApiRequest, NextApiResponse } from "next";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER,
});

/*  API Route Handler   */
export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            await handlePOST(req, res); // Handle POST requests
            break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}

/*  Handle HTTP POST Actions    */
async function handlePOST(req, res) {
    const action = req.query.action;
    switch (action) {
        case "subscribe":
            await handleSubscribe(req, res); // Handle subscribe requests
            break;
        case "unsubscribe":
            await handleUnsubscribe(req, res); // Handle unsubscribe requests
            break;
        default:
            return res.status(405).json({ error: "Method not allowed" }); // Handle invaild requests
    }
}

async function handleSubscribe(req, res) {
    try {
        const resp = await mailchimp.lists.batchListMembers(process.env.MAILCHIMP_NEWSLETTR_LIST_ID, {
            members: [
                {
                    email_address: req.body.email,
                    status: "subscribed",
                },
            ],
            update_existing: true,
        });
        return res.status(200).json({ data: resp, message: "Subscribed to newsletter!" });
    } catch {
        return res.status(400).json({ message: "Failed subscribe!" });
    }
}

async function handleUnsubscribe(req, res) {
    try {
        const resp = await mailchimp.lists.batchListMembers(process.env.MAILCHIMP_NEWSLETTR_LIST_ID, {
            members: [
                {
                    email_address: req.body.email,
                    status: "unsubscribed",
                },
            ],
            update_existing: true,
        });
        return res.status(200).json({ data: resp, message: "Unsubscribed from newsletter!" });
    } catch {
        return res.status(400).json({ message: "Failed unsubscribe!" });
    }
}
