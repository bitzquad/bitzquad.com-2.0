/*    Imports    */
import { Connection } from "mongoose";
// define global variable 'mongoose'
declare global {
    var mongoose: any;
}
// define global variable 'mongoose'
export const mongoose = global.mongoose || new Connection();
