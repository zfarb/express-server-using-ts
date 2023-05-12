import { Router, Request, Response } from 'express';
import { loginTemplate } from '../templates/login';
import { rootLoggedInTemplate, rootLoggedOutTemplate } from '../templates/root';
import { requireAuth } from '../middlewares/requireAuth';

// express type definition file is not sufficient, assumes we have a body property in the request but this is not always true. override body type with an interface. interface will extend type Request giving it all the properties of Request, from there we will write in our own type for the body property which will overwrite the the Request body property type
interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }; // new type for body is an object with key that is a string which refers to a value that is a string or undefined
}

const router = Router(); // init express router

// routes
router.get('/', (req: Request, res: Response) => {
    // we are using cookie session to determine whether a user is logged in or not and the type for session is CookieSessionObject or null or undefined. this means we must use a type guard to check if the session is not null or undefined and then must check the loggedIn property of session to see whether we are logged in or not. if both conditions are met show the root logged in template
    if (req.session && req.session.loggedIn) {
        res.send(rootLoggedInTemplate);
    }

    // if req.session is null or undefined and/or the loggedIn property is not true show the root logged out template
    else {
        res.send(rootLoggedOutTemplate);
    }
});

router.get('/login', (req: Request, res: Response) => {
    res.send(loginTemplate);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body; // since we named the inputs in the loginTemplate "email" and "password", bodyParser will add the values of those inputs into the body of the request under the respective keys (email and password). this means we can pull out the values of the inputs from the body by destructing the respective keys from body

    // since we are using a type of RequestWithBody for our req, email is possibly undefined since it is a key within the body object. to solve the case where the key values within body are undefined, we must set up a type guard that checks to see if the key values are not undefined. in this case we will also only allow one set of credentials to login so we will check to see if the email and password match the credentials
    if (email === 'email@email.com' && password === 'password') {
        req.session = { loggedIn: true }; // set session.loggedIn property to true to login user
        res.redirect('/'); // redirect user to the root route
    }

    // if credentials dont match, send back a message
    else {
        res.send('Invalid email or password');
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined; // reset session object
    res.redirect('/'); // redirect to root route
});

// protected route that requires session.loggedIn property to be true by using requireAuth middleware to ensure user is logged in
router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Protected route, you are logged in');
});

export { router }; // export router
