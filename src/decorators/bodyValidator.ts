import 'reflect-metadata';
import { Metadatakeys } from './MetadataKeys';

// 'bodyValidator' factory decorator. takes in an array of keys of type array of strings and returns a function that takes in a path of type string and returns a decorator function. decorator function takes in a target of type any, key of type string and desc of type PropertyDescriptor
export function bodyValidator(...keys: string[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(Metadatakeys.validator, keys, target, key); // define different metadata keys for key of target
    };
}
