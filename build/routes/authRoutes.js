"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var login_1 = require("../templates/login");
var root_1 = require("../templates/root");
var requireAuth_1 = require("../middlewares/requireAuth");
var router = (0, express_1.Router)(); // init express router
exports.router = router;
// routes
router.get('/', function (req, res) {
    // we are using cookie session to determine whether a user is logged in or not and the type for session is CookieSessionObject or null or undefined. this means we must use a type guard to check if the session is not null or undefined and then must check the loggedIn property of session to see whether we are logged in or not. if both conditions are met show the root logged in template
    if (req.session && req.session.loggedIn) {
        res.send(root_1.rootLoggedInTemplate);
    }
    // if req.session is null or undefined and/or the loggedIn property is not true show the root logged out template
    else {
        res.send(root_1.rootLoggedOutTemplate);
    }
});
router.get('/login', function (req, res) {
    res.send(login_1.loginTemplate);
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password; // since we named the inputs in the loginTemplate "email" and "password", bodyParser will add the values of those inputs into the body of the request under the respective keys (email and password). this means we can pull out the values of the inputs from the body by destructing the respective keys from body
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
router.get('/logout', function (req, res) {
    req.session = undefined; // reset session object
    res.redirect('/'); // redirect to root route
});
// protected route that requires session.loggedIn property to be true by using requireAuth middleware to ensure user is logged in
router.get('/protected', requireAuth_1.requireAuth, function (req, res) {
    res.send('Protected route, you are logged in');
});
