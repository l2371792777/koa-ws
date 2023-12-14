import jwt from "jsonwebtoken";
import { security } from "../config/config";
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