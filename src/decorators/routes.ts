import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { Metadatakeys } from './MetadataKeys';

// overwrite value property in PropertyDescriptor to be of type RequestHandler
interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}

// 'routeBinder' factory decorator. takes in a method and returns a function that takes in a path of type string and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
export function routeBinder(method: string) {
    return function (path: string) {
        return function (
            target: any,
            key: string,
            desc: RouteHandlerDescriptor
        ) {
            Reflect.defineMetadata(Metadatakeys.path, path, target, key); // define metadata. key is 'path', value is path arg, target is target, key is key
            Reflect.defineMetadata(Metadatakeys.method, method, target, key); // define metadata. key is 'method', value is method arg to specify type of request, target is target, key is key
        };
    };
}

// export routeBinder functions for different request types
export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
