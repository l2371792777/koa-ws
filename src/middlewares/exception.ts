import * as config from "../config/config";

// using namespace MyModel;
/**
     * Catches any errors that occur during the execution of the next middleware function and handles them accordingly.
     * 
     * @param {any} ctx - The context object that represents the state and request information of the application.
     * @param {any} next - The next middleware function in the application's request-response cycle.
     * @returns {Promise<any>} - A promise that resolves when the error handling is complete.
     */
async function catchError(ctx: any, next: any): Promise<any> {
    try {
        await next();
    }
    catch (error) {
        const isDev=config.environment === 'dev';
        const isErrorModel=error instanceof global.ResModel.ErrorModel;
        if (isDev && !isErrorModel) {
            throw error;
        }
        if (isErrorModel) {
            ctx.body = {
                'mes': error
            };
        }
        else {
            ctx.body = {
                'mes': "error"
            }
        }
    }
}

export default catchError;