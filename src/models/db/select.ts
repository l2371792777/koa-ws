import sequelize from "../../core/db";
import { User } from "../user";


const result = User.findOne({
    where: {
        email: "2371792777@qq.com"
    }
})
console.log(result);