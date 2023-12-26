import sequelize from "../../core/db";
require("../flow");

sequelize.sync({ force: false }).then(() => {
    process.exit();
})