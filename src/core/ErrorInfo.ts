import { number } from "joi";

/**
 * @description 错误信息
 */
interface baseErrorInfo{
    errno:number,
    message:string
}
const registerFailInfo:baseErrorInfo = {
    errno: 10001,
    message: '注册失败',
};
const registerUserNameExistInfo:baseErrorInfo = {
    errno: 10002,
    message: '用户名已存在',
};
export {
    baseErrorInfo,
    registerFailInfo,
    registerUserNameExistInfo
}


