import express from 'express';
import { router } from './routes/authRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express(); // init express

// tell express app to use middlewares
app.use(bodyParser.urlencoded({ extended: true })); // parse and add body property to request objects
app.use(cookieSession({ keys: ['abcd'] })); // cookie encryption key
app.use(router); // use the router middleware we created (holds our routes)

app.listen(3000); // listen on port 3000
