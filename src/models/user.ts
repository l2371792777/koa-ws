import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../core/db";

const User = sequelize.define('User', {
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
        allowNull: true
    }
});

export {
    User
};