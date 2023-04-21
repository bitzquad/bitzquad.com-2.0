/*    Imports    */
import mongoose from "mongoose";
import CContact from "../../classes/contact/CContact";
// schema implimentation for recruit request
const Schema = new mongoose.Schema<CContact>(
    {
        name: {
            first: { type: String, default: "" },
            last: { type: String, default: "" },
        },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },

        title: { type: String, default: "" },
        message: { type: String, default: "" },

        draft: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<CContact>("Contact", Schema);
