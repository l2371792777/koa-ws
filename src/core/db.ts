import { Sequelize } from "sequelize";
import { database } from '../config/config';

const sequelize = new Sequelize(database.dbName, database.user, database.password, {
    host: database.host,
    port: database.port,
    dialect: 'mysql',
    define: {
    }
})
sequelize.authenticate().then(()=>{
    console.log('Database synchronized');
})
.catch((error)=>{
    console.error('Error synchronizing database:', error);
})


export default sequelize;