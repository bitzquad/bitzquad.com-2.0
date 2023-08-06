/*    Imports    */
import mongoose from "mongoose";
import CCollection from "../../classes/collection/CCollection";
// schema implimentation for collection
const Schema = new mongoose.Schema<CCollection>(
    {
        name: { type: String, required: true, default: "" },
        key: { type: String, required: true, default: "" },
        ref: { type: String, default: "" },
        valuesameaskey: { type: Boolean, default: true },
        valuetype: { type: String, default: "text" },
        values: {
            type: [
                {
                    key: { type: String, required: true, default: "" },
                    value: { type: String, required: true, default: "" },
                },
            ],
        },
        draft: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Collections || mongoose.model<CCollection>("Collections", Schema);
