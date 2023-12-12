import sequelize from "../../core/db";
require("./user");

sequelize.sync({ force: false }).then(() => {
    process.exit();
})