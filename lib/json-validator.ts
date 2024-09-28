import { errorHandler } from "./errorHandler";

/**
 * Responsible to validate whether given input is proper object or not
 * @param o object
 * @returns true if the given input is proper object otehrwise false
 */
export const isValidJson = (o: object)=>{
    let parsedJson;
    try {
        if(Array.isArray(o)){
            return false;
        } else if(typeof o === 'string'){
            parsedJson = JSON.parse(o);
        } else {
            parsedJson = JSON.parse(JSON.stringify(o));
        }
        return o && typeof o === "object";
    } catch(e) {
        return false;
    }
}

/**
 * Responsible to validate whether given object has any properties or not
 * @param o object 
 * @returns true if the given object has no propeties in it otherwise false
 */

export function isEmptyJson(o: object){
    if(isValidJson(o)){
        return Object.keys(o).length ? false : true;
    } else {
        return errorHandler(null,'Invalid Argument');
    }
}