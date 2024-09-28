import { isValidJson } from "./json-validator"

/**
 * Responsible to shallow merge the given objects
 * @param o1 object1
 * @param o2 object2
 * @returns 
 */
export const mergeObjects = (o1: object, o2: object)=> {
    if(isValidJson(o1) && isValidJson(o2)){
        return Object.assign({}, o1, o2);
    }
};

export const copyObjects = mergeObjects;
export const concatObject = mergeObjects;
export const mergeJson = mergeObjects;

/**
 * 
 * @param o1 object1
 * @param o2 object2
 * @returns merged object with deepclone
 */
export const mergeWithDeepCopy = (o1: object, o2: object)=> {
    if(isValidJson(o1) && isValidJson(o2)){
        return Object.assign({}, structuredClone(o1), structuredClone(o2));
    }
};
export const concatObjectsWithDeepCopy = mergeWithDeepCopy;
export const copyObjectsWithDeepCopy = mergeWithDeepCopy;