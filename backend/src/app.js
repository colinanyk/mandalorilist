import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import configureRoutes from './routes';
import db from './utilities/db';
import validation from './utilities/validation';

dotenv.config();

const port = process.env.PORT || 3002;
const app = express();

module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '125mb'}));
app.use(cors());

db.connect();

app.param('id', (req, res, next, id) => {
    req.id = id;
    next();
});

app.param('user', (req, res, next, user) => {
    req.user = user;
    next();
});

app.param('imdbId', (req, res, next, imdbId) => {
    req.imdbId = imdbId;
    next();
});

// app.all('/api/v1/:user/*', validation.authenticateRequest);

configureRoutes(app);

app.listen(port, () => console.log('Mandalorilist is listening on port ' + port));

app.get('/', (req, res) => res.status(200).send('Mandalorilist API'));

