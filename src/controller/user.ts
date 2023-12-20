import { create, findByEmail, verifyEmailPassword } from '../server/user';
import { ErrorModel } from '../core/ResModel';
import bcrypt from "bcryptjs";
import { LoginType } from '../app/validators/validator';
import { generateToken } from '../core/util';
import Auth from '../middlewares/auth';
import wxManager from '../server/wx';
async function createUser(user: any): Promise<any> {
    //todo 邮箱重复验证
    let result: any = await findByEmail(user.email);
    if (result) {
        throw new ErrorModel(global.ErrorInfo.registerEmailExistInfo).setData(result);
    }
    //todo 加密密码
    user.password = await bcrypt.hash(user.password, 10);
    result = await create(user);
    return result;
}

async function login(user: any): Promise<any> {
    let result:any;
    switch (user.type) {
        case LoginType.USER_EMAIL:
            result = await verifyEmailPassword(user);
            return generateToken(result.dataValues.id, Auth.USER);
            break;
        case LoginType.USER_MINI_PROGRAM:
            result=await wxManager.codeToToken(user.account);
            return generateToken(result.dataValues.id, Auth.USER);
            break;
        case LoginType.USER_MOBILE:
            break;
        case LoginType.ADMIN_EMAIL:
            break;
        default:
            throw new global.ResModel.ErrorModel(global.ErrorInfo.missFunction);
    }
}

export {
    createUser,
    login
}