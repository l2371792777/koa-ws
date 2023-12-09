import { ErrorModel } from "../core/model/ResModel";

async function catchError(ctx: any, next: any): Promise<any> {
    try {
        await next();
    }
    catch (error) {
        if (error instanceof ErrorModel) {
            ctx.body = {
                'mes': error
            };
            console.log(error.message);
        }
        else{
            console.log(error);
        }
    }
}

export = catchError;