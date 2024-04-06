import * as env from 'dotenv';
env.config();

let allowedOrigins: string[] | [];

if (process.env.NODE_ENV === 'development') {
    allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
} else {
    allowedOrigins = ['https://ivylu.vercel.app/', 'http://ivylu.arielbehar.com/', 'https://ivylu.arielbehar.com/'];
}

export default allowedOrigins;