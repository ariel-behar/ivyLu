import jwt from 'jsonwebtoken'
import * as env from 'dotenv'
import {UserDTO} from '../models/User';

env.config()

const generateAuthToken = (user: UserDTO) => {
    let payload = user;

    let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

    return AUTH_TOKEN;
}

export default generateAuthToken; 