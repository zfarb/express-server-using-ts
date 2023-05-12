"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.routeBinder = void 0;
require("reflect-metadata");
const Methods_1 = require("./Methods");
const MetadataKeys_1 = require("./MetadataKeys");
// 'routeBinder' factory decorator. takes in a method and returns a function that takes in a path of type string and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.Metadatakeys.path, path, target, key); // define metadata. key is 'path', value is path arg, target is target, key is key
            Reflect.defineMetadata(MetadataKeys_1.Metadatakeys.method, method, target, key); // define metadata. key is 'method', value is method arg to specify type of request, target is target, key is key
        };
    };
}
exports.routeBinder = routeBinder;
// export routeBinder functions for different request types
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
