import { ErrorMessges } from "./datatypes/enums";
import { errorHandler } from "./errorHandler";
import { isValidJson } from "./json-validator";

/**
 * 
 * @param o object 
 * @returns shallow cloned object
 */
export function shallowClone(o: object) {
    if(isValidJson(o)){
        // METHOD 1: using Spread Operator
        return { ...o };

        // METHOD 2: using Object methos
        // return Object.assign({}, o);
    } else{
        return errorHandler(null, ErrorMessges.INVALID_ARGUMENT);
    }
}
export const shallowCopy = shallowClone;
/**
 * 
 * @param o object
 * @returns deep copied object which doesnt hold any reference of parent object
 */
export function deepClone(o: object) {
    if(isValidJson(o))
    // METHOD 1: using JSON stringify
    // return JSON.parse(JSON.stringify(o));
    // METHOD 1=2: using JS default structured clone
    return structuredClone(o);
    else errorHandler(null, ErrorMessges.INVALID_ARGUMENT)
}
export const deepCopy = deepClone;