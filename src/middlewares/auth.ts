import { security } from "../config/config";
import jwt from "jsonwebtoken";
import { ErrorModel } from "../core/ResModel";

class Auth {
    constructor() {
    }
    get verifyToken() {
        return async (ctx: any, next: any): Promise<any> => {
            let authorizationHeader: string = ctx.request.headers['authorization'];
            if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
                authorizationHeader = authorizationHeader.substring(7); // 去除 'Bearer '，获取实际令牌部分
            }
            else {
                throw new global.ResModel.ErrorModel(global.ErrorInfo.forbbiden,ctx);
            }
            try {
                var decode=jwt.verify(authorizationHeader,security.securityKey);
            }
            catch (error) {
                let errorModel:ErrorModel=new ErrorModel(global.ErrorInfo.tokenVerifyInfo,ctx);
                if(error.name==="TokenExpiredError"){
                    errorModel.setMessage("token过期");
                }
                throw errorModel.setData(error);
            }
            ctx.auth={
                uid:decode.uid,
                scope:decode.scope
            }
            await next();
        }
    }
}

export default Auth;