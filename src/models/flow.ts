import { DataTypes, Model, ModelAttributes, Optional } from "sequelize";
import sequelize from "../core/db";

class Flow extends Model {
    public static attribute: ModelAttributes<Flow, Optional<any, never>> = {
        index: {
            type: DataTypes.INTEGER
        },
        artId: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.INTEGER
        }
    }
}
Flow.init(Flow.attribute,{
    sequelize,
    tableName:"flow"
})

export{
    Flow
}