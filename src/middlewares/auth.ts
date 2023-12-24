import { security } from "../config/config";
import jwt from "jsonwebtoken";
import { ErrorModel } from "../core/ResModel";
import { EnumDataType } from "sequelize";

class Auth {
    public static USER: number = 8;
    public static ADMIN: number = 16;
    public static SUPER_ADMIN: number = 32;
    private level: number;
    constructor(level?: number) {
        this.level = level || 1;
    }
    /**
     * 验证token
     */
    get verify() {
        return async (ctx: any, next: any): Promise<any> => {
            let decode: any;
            let authorizationHeader: string = ctx.request.headers['authorization'];
            if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
                authorizationHeader = authorizationHeader.substring(7); // 去除 'Bearer '，获取实际令牌部分
            }
            else {
                throw new global.ResModel.ErrorModel(global.ErrorInfo.forbbiden, ctx);
            }
            try {
                decode = jwt.verify(authorizationHeader, security.securityKey);
            }
            catch (error) {
                let errorModel: ErrorModel = new ErrorModel(global.ErrorInfo.authVerifyInfo, ctx);
                if (error.name === "TokenExpiredError") {
                    errorModel.setMessage("token过期");
                }
                throw errorModel.setData(error);
            }
            if (decode.scope < this.level) {
                throw new ErrorModel(global.ErrorInfo.authVerifyInfo, ctx).setMessage("用户权限限制");
            }
            await next();
        }
    }
    /**
     * 验证token是否合法
     * @param token 
     * @returns 
     */
    static verifyToken(token: string): boolean {
        try {
            jwt.verify(token, security.securityKey);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}

export default Auth;