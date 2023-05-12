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
exports.RootController = void 0;
const root_1 = require("../templates/root");
const decorators_1 = require("../decorators");
const requireAuth_1 = require("../middlewares/requireAuth");
let RootController = class RootController {
    getRoot(req, res) {
        // we are using cookie session to determine whether a user is logged in or not and the type for session is CookieSessionObject or null or undefined. this means we must use a type guard to check if the session is not null or undefined and then must check the loggedIn property of session to see whether we are logged in or not. if both conditions are met show the root logged in template
        if (req.session && req.session.loggedIn) {
            res.send(root_1.rootLoggedInTemplate);
        }
        // if req.session is null or undefined and/or the loggedIn property is not true show the root logged out template
        else {
            res.send(root_1.rootLoggedOutTemplate);
        }
    }
    getProtected(req, res) {
        res.send('Protected route, you are logged in');
    }
};
__decorate([
    (0, decorators_1.get)('/') // 'get' decorator for root route
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
__decorate([
    (0, decorators_1.get)('/protected') // 'get' decorator for protected route
    ,
    (0, decorators_1.use)(requireAuth_1.requireAuth) // protected route that requires session.loggedIn property to be true by using requireAuth middleware to ensure user is logged in
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getProtected", null);
RootController = __decorate([
    (0, decorators_1.controller)('') // 'controller' decorator for root route (empty string because root route is specified in the get decorator)
], RootController);
exports.RootController = RootController;
