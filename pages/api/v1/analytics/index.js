/*  Importings    */
import { BetaAnalyticsDataClient } from "@google-analytics/data";

/*  API Route Handler    */
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await handleGET(req, res);
            break;
        default:
            return res.status(400).json({ message: "Invalid Request" });
    }
}
/*  Handle HTTP GET Actions    */
async function handleGET(req, res) {
    try {
        const analyticsDataClient = new BetaAnalyticsDataClient({
            credentials: JSON.parse(process.env.GOOGLE_CRED),
        });
        const [response] = analyticsDataClient.runReport({
            property: `properties/329441108`,
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
            dateRanges: [{ startDate: "3000daysAgo", endDate: "today" }],
            dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "CONTAINS", value: req.query.url } } },
            metricAggregations: ["TOTAL"],
        });

        return res.status(200).json({ users: response.rows[0].metricValues[0].value, views: response.rows[0].metricValues[1].value });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
