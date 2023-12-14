import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../core/db";

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, Infinity],
                msg:'Password must be at least 6 characters long'
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
        allowNull: false
    }
});

export {
    User
};