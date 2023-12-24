import jwt from "jsonwebtoken";
import { security } from "../config/config";

/**
 * 生成token
 * @param uid 用户id
 * @param scope 权限等级
 * @returns 
 */
function generateToken(uid: number, scope: number): string {
    const token = jwt.sign({
        uid,
        scope
    }, security.securityKey, {
        expiresIn: security.expiresIn
    })
    return token;
}
export {
    generateToken
}