import jwt from './jwt';
import redisIntegration from "./redisIntegration";

export async function authenticateRequest(req, res, next) {
    let token = req.headers['token'];

    if (!token) {
        return res.status(403).send('Could not validate request');
    }

    try {
        await jwt.verifyToken(token);
        next();
    } catch (err) {
        return res.status(403).send('Could not validate request');
    }
}

export default {
    authenticateRequest
}