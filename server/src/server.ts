import path from 'path'
import { fileURLToPath } from 'url';
import express, {Application, NextFunction, Request, Response} from "express" ;
import cors from "cors"
import logger from 'morgan/index.js'

import initDatabase  from './config/initDatabase.js'
import routes from "./routes/routes.js"
import { sendErrorResponse } from "./utils/sendErrorResponse.js";
import { AuthenticationError, ForbiddenError, InvalidDataError, NotFoundError } from "./models/Errors.js";

const dbName = process.env.DB_NAME
const PORT = process.env.PORT || '3030';

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + '/public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options('*', cors())
app.use(cors({
    origin: ['http://ivylu.arielbehar.com/', 'https://ivylu.herokuapp.com/', 'http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

if(process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}


app.use("/api", routes)

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    let status = 500;
    if(err instanceof AuthenticationError) {
        status = 401;
    } else if(err instanceof ForbiddenError) {
        status = 403;
    } else if(err instanceof NotFoundError) {
        status = 404;
    } else if(err instanceof InvalidDataError) {
        status = 400;
    } 
    sendErrorResponse(req, res, err.status || status, `${err.message}`, err);
});

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


