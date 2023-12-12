
const environment = process.env.ENVIRONMENT || 'dev';
const database = {
    dbName: 'koaweixin',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'ayanami'
}

export {
    environment,
    database
};