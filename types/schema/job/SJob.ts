/*    Imports    */
import mongoose from "mongoose";
import CJob from "../../classes/job/CJob";
// schema implimentation for job
const Schema = new mongoose.Schema<CJob>(
    {
        name: { type: String, required: true, default: "" },
        description: { type: String, default: "" },
        content: { type: String, default: "" },

        category: { type: String, default: "" },
        jobtype: { type: String, default: "" },
        seniority: { type: String, default: "" },
        industry: { type: String, default: "" },
        experience: { type: String, default: "" },
        workplace: { type: String, default: "" },
        education: { type: String, default: "" },

        salary: {
            timeperiod: { type: String, default: "" },
            avarage: { type: Number, default: 0 },
            currency: { type: String, default: "USD" },
        },

        quality: { type: Number, default: 0 },
        vacent: { type: Boolean, default: true },
        urgent: { type: Boolean, default: false },
        candidatescount: { type: Number, default: 1, min: 1 },

        place: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            country: { type: String, default: "" },
            zip: { type: String, default: "" },

            latitude: { type: Number, default: 0.0 },
            longitude: { type: Number, default: 0.0 },
            location: { type: String, default: "" },
        },
        thumbnail: {
            alt: { type: String, default: "" },
            src: { type: String, default: "" },
            width: { type: Number, default: 100 },
            height: { type: Number, default: 100 },
        },
        company: {
            id: { type: String, required: true, default: "" },
            name: { type: String, default: "" },
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            thumbnail: {
                alt: { type: String, default: "" },
                src: { type: String, default: "" },
                width: { type: Number, default: 100 },
                height: { type: Number, default: 100 },
            },
            website: { type: String, default: "" },
            owner: { type: String, default: "" },
        },
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
        tags: { type: [String], default: [] },
        registration: {
            open: { type: Boolean, default: false },
            openforpublic: { type: Boolean, default: true },
            hasstarttime: { type: Boolean, default: false },
            hasendtime: { type: Boolean, default: false },
            time: {
                starttime: { type: String, default: new Date(1930, 1, 1).toISOString() },
                endtime: { type: String, default: new Date(1930, 1, 1).toISOString() },
                timezone: { type: String, default: "" },
            },
            usesystemform: { type: Boolean, default: true },
            formurl: { type: String, default: "" },
        },

        status: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
        owner: { type: String, default: "" },

        draft: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Jobs || mongoose.model<CJob>("Jobs", Schema);
