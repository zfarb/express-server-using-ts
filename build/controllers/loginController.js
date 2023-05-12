"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../templates/login");
const decorators_1 = require("../decorators");
let LoginController = class LoginController {
    // getLogin method. takes args req of type Request, res of type Response and returns nothing (type void)
    getLogin(req, res) {
        res.send(login_1.loginTemplate);
    }
    postLogin(req, res) {
        const { email, password } = req.body; // since we named the inputs in the loginTemplate "email" and "password", bodyParser will add the values of those inputs into the body of the request under the respective keys (email and password). this means we can pull out the values of the inputs from the body by destructing the respective keys from body
        req.session = { loggedIn: true }; // set session.loggedIn property to true to login user
        res.redirect('/'); // redirect user to the root route
    }
    getLogout(req, res) {
        req.session = undefined; // reset session object
        res.redirect('/'); // redirect to root route
    }
};
__decorate([
    (0, decorators_1.get)('/login') // 'get' decorator for route /login
    // getLogin method. takes args req of type Request, res of type Response and returns nothing (type void)
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogin", null);
__decorate([
    (0, decorators_1.post)('/login') // 'post' decorator for route /login
    ,
    (0, decorators_1.bodyValidator)('email', 'password') // bodyValidator middleware
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, decorators_1.get)('/logout') // 'get' decorator for route /logout
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogout", null);
LoginController = __decorate([
    (0, decorators_1.controller)('/auth') // 'controller' decorator for route /auth
], LoginController);
