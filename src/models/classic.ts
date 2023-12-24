import { DataTypes, Model, ModelAttributes, Optional } from "sequelize";
import sequelize from "../core/db";

class Base extends Model {
    public static attribute: ModelAttributes<Base, Optional<any, never>> = {
        image: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        },
        pubdate: {
            type: DataTypes.DATEONLY
        },
        type: {
            type: DataTypes.TINYINT
        },
        fav_nums: {
            type: DataTypes.INTEGER
        }
    }
}
class Movie extends Base {

}
Movie.init(Movie.attribute, {
    sequelize,
    tableName: "movie"
});

class Sentence extends Base {
}
Sentence.attribute.url = {
    type: DataTypes.STRING
}
Sentence.init(Sentence.attribute, {
    sequelize,
    tableName: "sentence"
});

class Music extends Base {
}
Music.init(Music.attribute, {
    sequelize,
    tableName: "music"
});

export {
    Movie,
    Sentence,
    Music
}