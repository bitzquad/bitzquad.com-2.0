/*    Imports    */
import mongoose from "mongoose";
import CUser from "../../classes/user/CUser";
// schema implimentation for user
const Schema = new mongoose.Schema<CUser>(
    {
        name: {
            first: { type: String, required: true, default: "" },
            last: { type: String, required: true, default: "" },
        },
        dob: { type: String, default: new Date(1930, 1, 1).toISOString() },
        gender: { type: String, default: "" },
        email: { type: String, required: true, unique: true },
        phone: { type: String, default: "" },
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            country: { type: String, default: "" },
            zip: { type: String, default: "" },

            latitude: { type: Number, default: 0.0 },
            longitude: { type: Number, default: 0.0 },
            location: { type: String, default: "" },
        },

        nationality: { type: String, default: "" },
        ethnicity: { type: String, default: "" },
        community: { type: String, default: "" },

        description: { type: String, default: "" },
        content: { type: String, default: "" },
        social: {
            type: [
                {
                    url: { type: String, default: "" },
                    name: { type: String, default: "" },
                    description: { type: String, default: "" },
                    iconsrc: { type: String, default: "" },
                },
            ],
            default: [],
        },
        thumbnail: {
            alt: { type: String, default: "" },
            src: { type: String, default: "" },
            width: { type: Number, default: 100 },
            height: { type: Number, default: 100 },
        },

        status: { type: Number, default: 0 },
        authid: { type: String, default: "" },

        jobcount: {
            count: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
            min: { type: Number, default: 0 },
        },
        eventcount: {
            count: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
            min: { type: Number, default: 0 },
        },

        draft: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Users || mongoose.model<CUser>("Users", Schema);
