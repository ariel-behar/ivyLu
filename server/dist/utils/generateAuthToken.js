import jwt from 'jsonwebtoken';
import * as env from 'dotenv';
env.config();
const generateAuthToken = (user) => {
    let payload = user;
    let authToken = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);
    return authToken;
};
export default generateAuthToken;
//# sourceMappingURL=generateAuthToken.js.map