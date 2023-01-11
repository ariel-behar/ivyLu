import jwt from 'jsonwebtoken';
import * as env from 'dotenv';
env.config();
const generateAuthToken = (user) => {
    let payload = user;
    let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);
    return AUTH_TOKEN;
};
export default generateAuthToken;
//# sourceMappingURL=generateAuthToken.js.map