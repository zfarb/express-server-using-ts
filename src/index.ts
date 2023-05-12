import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/loginController';
import './controllers/RootController';

const app = express(); // init express

// tell express app to use middlewares
app.use(bodyParser.urlencoded({ extended: true })); // parse and add body property to request objects
app.use(cookieSession({ keys: ['abcd'] })); // cookie encryption key
app.use(AppRouter.getInstance()); // use the controller router middleware

app.listen(3000); // listen on port 3000
