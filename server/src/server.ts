import express, {Express} from "express" ;
import cors from "cors"
import logger from 'morgan/index.js'

import initDatabase  from './config/initDatabase.js'
// import routes from "./routes/routes.js"

const dbName = process.env.DB_NAME
const PORT = process.env.PORT || '3030';

const app: Express = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.options('*', cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
// }));
// app.use(logger('dev'))

// app.use("/api", routes)

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


