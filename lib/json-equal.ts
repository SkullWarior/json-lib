import { isValidJson } from "./json-validator";
import { errorHandler } from "./errorHandler";
import { ErrorMessges } from "./datatypes/enums";

/**
 * Responsible to validate both objects are equal or not
 * @param o object1
 * @param i object2
 * @returns true if given objects matches with same values
 */
export const isEqual = function (o: object, i: object){
    if(isValidJson(o), isValidJson(i)){
       return recursiveCheck(o, i);
    }
    errorHandler(null, 'Invalid arguments');
}

/**
 * Responsible to validate and return length of the object
 * @param obj object
 * @returns length of the given object based on keys present inside object
 */
export const findLengthOfObject = function (obj: object){
    if(isValidJson(obj))
        return Object.keys(obj).length;
    else 
        return errorHandler(null, ErrorMessges.INVALID_ARGUMENT);
}

/**
 * Responsible to validate both objects are equal or not
 * @param o object1
 * @param i object2
 * @returns true if given objects matches with same values
 */

function recursiveCheck(obj1: any, obj2: any){
    if(findLengthOfObject(obj1) === findLengthOfObject(obj2)){
        //non-empty object validation, return true out of this loop if those are empty objects
        for(const obj1key in obj1) {
            //Iterates through each key in object and checks both objects has same type(primitive/non-primitive)
            if(typeof obj1[obj1key] === typeof obj2[obj1key]){
                if(Array.isArray(obj1[obj1key])) {
                    // checks both the objkeys are same array type
                    if(Array.isArray(obj2[obj1key])) {
                        const checkArrayOfObjects = handleArrayValues(obj1[obj1key], obj2[obj1key]);
                        if(!checkArrayOfObjects){
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if(isValidJson(obj1[obj1key])) {
                    if(isValidJson(obj2[obj1key])){
                        const objCheck = recursiveCheck(obj1[obj1key], obj2[obj1key]);
                        if(!objCheck){
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if(obj1[obj1key] !== obj2[obj1key]) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }
    return false;
}

function handleArrayValues(i1: Array<any>, i2: Array<any>){
    if(i1.length === i2.length){
        for(let i = 0; i< i1.length; i++){
            //Checks both values and types are same
            if(typeof i1[i] === typeof i2[i]){
                if(Array.isArray(i1[i]) && Array.isArray(i2[i])){
                    console.log("inside araya of array")
                    //checks items of array is also a array ex: [['2'],['3']]
                    const arrayItemCheck = handleArrayValues(i1[i], i2[i]);
                    if(!arrayItemCheck){
                        return false;
                    }
                }
                //validate whether items of an array is object
                else if(isValidJson(i1[i])) {
                    console.log("inside araya of objects");
                    if(isValidJson(i2[i])){
                        const check = recursiveCheck(i1[i], i2[i]);
                        if(!check){
                            return false;
                        }
                    } else {
                        return false;
                    }
                    
                } else {
                    //validates both the vaues are same for primitive datatypes
                    console.log("inside else case")
                    if(i1[i] !== i2[i]) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        // return true if the all above conditions matches
        return true;
    }
    return false;
}

/* *** TestCases *** */
//empty object testcases
//  const obj1= {};
//  const obj2 = {}   // true
 //Same key and value testcase
    // const obj1 = {name: 'vasu'};
    // const obj2 = {name: 'vasu'}; // true
//Same key and diff value testcase
    // const obj1 = {name: 'vasu'};
    // const obj2 = {name: 'test'};  //false
//invalid JSON with extra fiend in object
    // const obj1 = {name: 'vasu'};
    // const obj2 = {name: 'vasu', test: 'test'}; //false
//Object inside objects
    // const obj1 = { test: {name: 'vasu'}};
    // const obj2 = { test: {name: 'vasu'}}; //true
//Object inside objects with diff value
    // const obj1 = { test: {name: 'vasu'}};
    // const obj2 = { test: {name: 'test'}}; //false
//Array of objects
    // const obj1 = { test: [{name: 'vasu'}]};
    // const obj2 = { test: [{name: 'vasu'}]}; //true
//Array of objects with diff value
    // const obj1 = { test: [{name: 'vasu'}]};
    // const obj2 = { test: [{name: 'test'}]}; //false
    
// console.log(isEqual(obj1, obj2));