/*    Imports    */
import mongoose from "mongoose";

// check if connection url is defined in the environment variables
if (!process.env.MONGODBURL) throw new Error("MONGODBURL is not defined");

// cache the connection promise
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// connect to mongodb
async function Connect(url: string | null = null) {
    // if cached promise is not null, return it
    if (cached.conn) {
        return cached.conn;
    }
    // if url is null, use the default url, if url is null throw an error
    if (!url) {
        if (process.env.MONGODBURL) url = process.env.MONGODBURL;
        else throw new Error("MONGODBURL is not defined");
    }
    // create a new promise and connect to mongodb
    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(url, options).then((mongoose) => {
            return mongoose;
        });
    }
    //set cached promise to the new promise
    cached.conn = await cached.promise;
    return cached.conn;
}

export default { Connect };
