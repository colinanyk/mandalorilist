import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function generateToken(userDetails) {
    return new Promise((resolve, reject) => {
        jwt.sign({username: userDetails.username}, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                reject(err);
            }

            resolve(token);
        });
    });
}

export function decodeToken(token) {
    return jwt.decode(token);
}

export async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) reject(err);

            resolve(decoded);
        })
    })
}

export default {
    generateToken,
    decodeToken,
    verifyToken
}