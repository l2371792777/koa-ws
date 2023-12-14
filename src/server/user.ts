import { Sequelize, DataType } from "sequelize";
import bcrypt from "bcryptjs";
import { User } from "../models/user"

async function create(user: any): Promise<any> {
    const result = await User.create(user);
    return result;
}
async function findToEmail(email: string): Promise<any> {
    const result = await User.findOne({
        where: {
            email: email
        }
    })
    return result;
}

async function verifyEmailPassword(user:any): Promise<any> {
    const result = await findToEmail(user.account);
    if (!result) {
        throw new global.ResModel.ErrorModel(global.ErrorInfo.loginUserNoExistInfo);
    }
    const correct = await bcrypt.compare(user.secret, result.dataValues.password);
    if(!correct){
        throw new global.ResModel.ErrorModel(global.ErrorInfo.verifyEmailPassword);
    }
    
    return result;
}

export {
    create,
    findToEmail,
    verifyEmailPassword
}
