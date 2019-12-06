import userRepository from '../entities/userRepository';
import constants from '../constants/dbMessageConstants';
import redisIntegration from '../utilities/redisIntegration';
import jwt from '../utilities/jwt';

export async function createUser (userDetails) {
    try {
        let response =  await userRepository.createUser(userDetails);

        return response;
    } catch (err) {
        throw new Error(constants.FAILED.USER.CREATE);
    }
}

export async function getUser(userDetails) {
    try {
        let user = await userRepository.getUser(userDetails);

        if (user) {
            return user;
        } else {
            return new Error(constants.FAILED.USER.FIND)
        }
    } catch (err) {
        throw new Error(constants.FAILED.USER.FIND)
    }
}

export default {
    createUser,
    getUser
}