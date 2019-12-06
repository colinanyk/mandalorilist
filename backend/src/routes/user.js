import User from '../controllers/userController';

export default (app) => {
    app.post('/api/v1/user/create', User.create);
    app.post('/api/v1/user/login', User.login);
}