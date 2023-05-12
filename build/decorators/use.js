"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
// 'use' factory decorator. takes in middleware of type express RequestHandler and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.Metadatakeys.middleware, target, key) || []; // assign middlewares as an empty array. grab middlewares from metadata and store in middlewares array if any exist
        Reflect.defineMetadata(MetadataKeys_1.Metadatakeys.middleware, [...middlewares, middleware], target, key); // add middleware to middlewares array and define metadata of key 'middleware' for key of target
    };
}
exports.use = use;
