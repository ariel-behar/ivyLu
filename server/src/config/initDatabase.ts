import mongoose from 'mongoose'
import * as env from 'dotenv'
env.config()

export default function initDatabase (dbName: string){
    mongoose.set("strictQuery", false);
    return mongoose.connect(`${process.env.MONGODB_ATLAS_URI}/${dbName}`);
}
