import jwt from 'jsonwebtoken'
import * as env from 'dotenv'
import { IStaffDocument } from '../models/Staff';
import { IClientDocument } from '../models/Client';

env.config()

const generateAuthToken = (user: IStaffDocument | IClientDocument) => {
    let payload = user;

    let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

    return AUTH_TOKEN;
}

export default generateAuthToken; 