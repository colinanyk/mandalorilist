import redis from 'redis';

export function setSession(userId, token) {
    let client = redis.createClient();
    return new Promise((resolve, reject) => {
        client.on('error', (err) => reject(err));
        client.set(userId, token, 'ex', 1800, function (err, reply) {
            if (err) reject(err);

            resolve(reply);
        });
    });
}

export function getSession(userId) {
    let client = redis.createClient();
    return new Promise((resolve, reject) => {
        client.on('error', (err)=> reject(err));
        client.get(userId, function (err, reply) {
            if (err) reject(err);

            resolve(reply);
        })
    })
}

export default {
    setSession,
    getSession
}