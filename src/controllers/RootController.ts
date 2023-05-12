import { Request, Response } from 'express';
import { rootLoggedInTemplate, rootLoggedOutTemplate } from '../templates/root';
import { get, controller, use } from '../decorators';
import { requireAuth } from '../middlewares/requireAuth';

@controller('') // 'controller' decorator for root route (empty string because root route is specified in the get decorator)
export class RootController {
    @get('/') // 'get' decorator for root route
    getRoot(req: Request, res: Response) {
        // we are using cookie session to determine whether a user is logged in or not and the type for session is CookieSessionObject or null or undefined. this means we must use a type guard to check if the session is not null or undefined and then must check the loggedIn property of session to see whether we are logged in or not. if both conditions are met show the root logged in template
        if (req.session && req.session.loggedIn) {
            res.send(rootLoggedInTemplate);
        }

        // if req.session is null or undefined and/or the loggedIn property is not true show the root logged out template
        else {
            res.send(rootLoggedOutTemplate);
        }
    }

    @get('/protected') // 'get' decorator for protected route
    @use(requireAuth) // protected route that requires session.loggedIn property to be true by using requireAuth middleware to ensure user is logged in
    getProtected(req: Request, res: Response) {
        res.send('Protected route, you are logged in');
    }
}
