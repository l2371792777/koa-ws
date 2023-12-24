import sequelize from "../../core/db";
require("../user");

sequelize.sync({ force: true }).then(() => {
    process.exit();
})