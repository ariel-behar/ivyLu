import * as env from 'dotenv';
env.config();

let allowedOrigins: string[] | [];

if (process.env.NODE_ENV === 'development') {
    allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
} else {
    allowedOrigins = ['http://ivylu.onrender.com/', 'http://ivylu.arielbehar.com/', 'https://ivylu.herokuapp.com/'];
}

export default allowedOrigins;