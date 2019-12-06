import User from './models/user';

export async function createUser(userDetails) {

    return new Promise((resolve, reject) => {

        let newUser = new User({
            username: userDetails.username,
            password: userDetails.password
        });

        newUser.save((err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    });
}

export function getUser(userDetails) {
    return new Promise((resolve, reject) => {
        User.findOne({username: userDetails.username}, (err, user) => {
            if (err) reject(err);

            if (user) {
                user.comparePassword(userDetails.password, (err, match) => {
                    if (err) reject(err);

                    if (match) {
                        resolve(user);
                    }

                    resolve(match);
                });
            } else {
                reject(false);
            }
        });
    });
}

export default {
    createUser,
    getUser
}