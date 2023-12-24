import { Sequelize, DataTypes, Model, ModelAttributes, Optional } from "sequelize";
import sequelize from "../core/db";

class User extends Model {
    public static attribute: ModelAttributes<User, Optional<any, never>> = {
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [6, Infinity],
                    msg: 'Password must be at least 6 characters long'
                }
            }
        },
        openid: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
}
User.init(User.attribute, {
    sequelize,
    tableName: "user"
});

export {
    User
};