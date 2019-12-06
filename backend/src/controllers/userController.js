import userManager from '../managers/userManager';
import jwt from "../utilities/jwt";
import redisIntegration from "../utilities/redisIntegration";

export async function create(req, res) {
    let userDetails = req.body.userDetails;

    if (!userDetails) {
        return res.status(409).send('Failed to create user, no user details were provided.');
    }

    try {
        let createdUser = await userManager.createUser(userDetails);
        if (createdUser) {
            return res.status(201).send('Successfully created user');
        } else {
            return res.status(400).send('Failed to create user please try again')
        }
    } catch (err) {
        return res.status(400).send(err);
    }
}

export async function login(req, res) {
    let userDetails = req.body.userDetails;

    if (!userDetails) {
        return res.status(409).send('Failed to login, please verify your credentials and try again.')
    }

    try {
        let user = await userManager.getUser(userDetails);

        if (user) {
            let token = await jwt.generateToken(user);
            await redisIntegration.setSession(user.username, token, 'EX', 1800);

            return res.status(200).send({token: token, userId: user._id});
        } else {
            return res.status(400).send('Failed to login, please verify your credentials and try again.')
        }
    } catch (err) {
        return res.status(400).send('Failed to login, please verify your credentials and try again.');
    }
}

export default {
    create,
    login
}