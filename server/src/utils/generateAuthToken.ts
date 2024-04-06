import jwt from 'jsonwebtoken'
import * as env from 'dotenv'
import { IStaffDocument } from '../models/Staff';
import { IClientDocument } from '../models/Client';
import { Partial } from '../types/common-types';

env.config()

const generateAuthToken = (user: Partial<IStaffDocument> | Partial<IClientDocument>) => {
    let payload = user;

    let authToken = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

    return authToken;
}

export default generateAuthToken; 