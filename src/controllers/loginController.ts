import { Request, Response } from 'express';
import { loginTemplate } from '../templates/login';
import { get, post, controller, bodyValidator } from '../decorators';

@controller('/auth') // 'controller' decorator for route /auth
class LoginController {
    @get('/login') // 'get' decorator for route /login
    // getLogin method. takes args req of type Request, res of type Response and returns nothing (type void)
    getLogin(req: Request, res: Response): void {
        res.send(loginTemplate);
    }

    @post('/login') // 'post' decorator for route /login
    @bodyValidator('email', 'password') // bodyValidator middleware
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body; // since we named the inputs in the loginTemplate "email" and "password", bodyParser will add the values of those inputs into the body of the request under the respective keys (email and password). this means we can pull out the values of the inputs from the body by destructing the respective keys from body

        req.session = { loggedIn: true }; // set session.loggedIn property to true to login user
        res.redirect('/'); // redirect user to the root route
    }

    @get('/logout') // 'get' decorator for route /logout
    getLogout(req: Request, res: Response) {
        req.session = undefined; // reset session object
        res.redirect('/'); // redirect to root route
    }
}
