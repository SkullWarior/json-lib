import { ErrorCodes } from './datatypes/enums';

/**
 * 
 * @param error Error object if for any uncaught exceptions
 * @param m custom messgage argument to display in logs and throw error
 */
export const errorHandler = (error: Error | null, m: string)=> {
    console.log("Error Meessage: ", error?.message);
    console.log("Error Handler: ", error?.stack);
    
    throw new Error(m);
}