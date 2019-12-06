import user from './user';
import movie from './movie';

export default (app) => {
    user(app);
    movie(app);
}