import mongoose from 'mongoose';
import * as env from 'dotenv';
env.config();
export default function initDatabase(dbName) {
    mongoose.set("strictQuery", false);
    return mongoose.connect(`${process.env.MONGODB_LOCAL_URI}/${dbName}`);
}
//# sourceMappingURL=initDatabase.js.map