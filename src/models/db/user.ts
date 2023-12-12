import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../core/db";

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
                args: [6, 20],
                msg:'Password must be at least 6 characters long'
            }
        }
    },
    openid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    }
})