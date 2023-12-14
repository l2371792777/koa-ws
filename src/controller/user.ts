import { create, findToEmail, verifyEmailPassword } from '../server/user';
import { ErrorModel } from '../core/ResModel';
import bcrypt from "bcryptjs";
import { LoginType } from '../app/validators/validator';
import { generateToken } from '../core/util';
async function createUser(user: any): Promise<any> {
    //todo 邮箱重复验证
    let result: any = await findToEmail(user.email);
    if (result) {
        throw new ErrorModel(global.ErrorInfo.registerEmailExistInfo).setData(result);
    }
    //todo 加密密码
    user.password = await bcrypt.hash(user.password, 10);
    result = await create(user);
    return result;
}

async function login(user: any): Promise<any> {
    switch (user.type) {
        case LoginType.USER_EMAIL:
            let result = await verifyEmailPassword(user);
            return generateToken(result.dataValues.id, 2);
            break;
        case LoginType.USER_MINI_PROGRAM:
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