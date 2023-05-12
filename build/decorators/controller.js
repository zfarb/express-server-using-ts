"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
// 'bodyValidators' factory decorator. takes key of type string and returns a decorator function of type RequestHandler. decorator function takes in a req of Request, res of type Response, next of type NextFunction
function bodyValidators(keys) {
    return function (req, res, next) {
        // if no request body send back an error
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        // iterate through keys to validate they exist
        for (let key of keys) {
            // if key doesnt exist send back an error
            if (!req.body[key]) {
                res.status(422).send(`Missing ${key}`);
                return;
            }
        }
        // else call next function
        next();
    };
}
// 'controller' decorator factory. takes in a path of type string and returns a decorator function that takes in a target of type Function
function controller(rootPath) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance(); // init express router
        // iterate through all prototype methods in target. for each method, grab the method and set it to variable routeHandler, and grab the route from the metadata and set it to variable path
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key]; // grab value of key in target prototype object
            const path = Reflect.getMetadata(MetadataKeys_1.Metadatakeys.path, target.prototype, key); // grab path from metadata
            const method = Reflect.getMetadata(MetadataKeys_1.Metadatakeys.method, target.prototype, key); // grab method of type Methods (get, post, etc) from metadata
            const middlewares = Reflect.getMetadata(MetadataKeys_1.Metadatakeys.middleware, target.prototype, key) || []; // grab middlewares from metadata. middlewares might not always exist so give option to assign empty array as middlewares
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.Metadatakeys.validator, target.prototype, key) || []; // grab requiredBodyProps from metadata. requiredBodyProps might not always exist so give option to assign empty array as middlewares
            const validator = bodyValidators(requiredBodyProps); // validate body props
            // not every method in target is going to be a routeHandler so add a check to see if there is a path to ensure the method is going to be a routeHandler
            if (path) {
                router[method](rootPath + path, ...middlewares, validator, routeHandler); // set up routeHandler for given method for given path with prefix rootPath using given middlewares and validator with callback routeHandler
            }
        });
    };
}
exports.controller = controller;
