import { Sequelize, DataType } from "sequelize";
import bcrypt from "bcryptjs";
import { User } from "../models/user";

async function create(user: any): Promise<any> {
    const result = await User.create(user);
    return result;
}
async function findByEmail(email: string): Promise<any> {
    const result = await User.findOne({
        where: {
            email: email
        }
    })
    return result;
}
async function findByOpenId(openid: string): Promise<any> {
    const result = await User.findOne({
        where: {
            openid: openid
        }
    })
    return result;
}
async function createByOpenId(openid: string): Promise<any> {
    const result = await User.create({
        openid: openid
    });
    return result;
}

async function verifyEmailPassword(user: any): Promise<any> {
    const result = await findByEmail(user.account);
    if (!result) {
        throw new global.ResModel.ErrorModel(global.ErrorInfo.loginUserNoExistInfo);
    }
    const correct = await bcrypt.compare(user.secret, result.dataValues.password);
    if (!correct) {
        throw new global.ResModel.ErrorModel(global.ErrorInfo.verifyEmailPassword);
    }

    return result;
}

export {
    create,
    findByEmail,
    verifyEmailPassword,
    createByOpenId,
    findByOpenId
}
