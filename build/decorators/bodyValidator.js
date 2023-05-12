"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
// 'bodyValidator' factory decorator. takes in an array of keys of type array of strings and returns a function that takes in a path of type string and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
function bodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.Metadatakeys.validator, keys, target, key); // define different metadata keys for key of target
    };
}
exports.bodyValidator = bodyValidator;
