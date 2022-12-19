const mongoose = require('mongoose');
require('dotenv').config();

function initDatabase (dbName){
    mongoose.set("strictQuery", false);
    return mongoose.connect(`${process.env.MONGODB_LOCAL_URI}/${dbName}`);
}

module.exports =  initDatabase;