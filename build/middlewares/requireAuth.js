"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
// function that takes a request, response and a next function, returns nothing and checks whether the user is logged in. if the user is logged in, call next function, else redirect to the root route
function requireAuth(req, res, next) {
    // we are using cookie session to determine whether a user is logged in or not and the type for session is CookieSessionObject or null or undefined. this means we must use a type guard to check if the session is not null or undefined and then must check the loggedIn property of session to see whether we are logged in or not. if both conditions are met, call next function
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    // if req.session is null or undefined and/or the loggedIn property is not true send an error and show not permitted
    else {
        res.status(403);
        res.send('Not permitted');
    }
}
exports.requireAuth = requireAuth;
