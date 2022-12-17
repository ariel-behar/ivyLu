const express = require('express');
const cors = require('cors');

const initDatabase = require('./config/initDatabase.js')

const dbName = 'ivy-lu';
const PORT = process.env.PORT || '3030';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

initDatabase(dbName)
    .then(() =>{
        console.log(`Succesfully connected to database: ${dbName}`);        

        app.listen(PORT, () => {
            console.log(`App is running on: http://localhost:${PORT}`);
        })
    })
    .catch(error => {
        console.log(`An error occurred while connecting to database: ${error}`)
    })


