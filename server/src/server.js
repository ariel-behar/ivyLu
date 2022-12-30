import express from "express" ;
import cors from "cors"

import initDatabase  from './config/initDatabase.js'
import routes from "./routes/routes.js"

const dbName = 'ivy-lu';
const PORT = process.env.PORT || '3030';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes)

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


