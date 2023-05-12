import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Metadatakeys } from './MetadataKeys';

// 'use' factory decorator. takes in middleware of type express RequestHandler and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares =
            Reflect.getMetadata(Metadatakeys.middleware, target, key) || []; // assign middlewares as an empty array. grab middlewares from metadata and store in middlewares array if any exist

        Reflect.defineMetadata(
            Metadatakeys.middleware,
            [...middlewares, middleware],
            target,
            key
        ); // add middleware to middlewares array and define metadata of key 'middleware' for key of target
    };
}
