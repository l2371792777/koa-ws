import { resInfo } from "./ResModel";

/**
 * @description 错误信息
 */
const registerFailInfo: resInfo = {
    errno: 10001,
    message: '注册失败',
};
const registerEmailExistInfo: resInfo = {
    errno: 10002,
    message: '注册邮箱已存在',
};
const loginUserNoExistInfo: resInfo = {
    errno: 10003,
    message: '登录用户不存在',
};
const verifyPasswordInfo: resInfo = {
    errno: 10004,
    message: '密码错误',
};
const forbbiden: resInfo = {
    errno: 10005,
    message: '禁止访问',
    code:403
};
const authVerifyInfo: resInfo = {
    errno: 10006,
    message: '令牌不合法',
};
const missFunction: resInfo = {
    errno: 10101,
    message: '缺少函数',
};

export {
    registerFailInfo,
    registerEmailExistInfo,
    loginUserNoExistInfo,
    verifyPasswordInfo,
    missFunction,
    forbbiden,
    authVerifyInfo 
}


