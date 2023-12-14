
const environment = process.env.ENVIRONMENT || 'dev';
const database = {
    dbName: 'koaweixin',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'ayanami'
}
const security = {
    securityKey: "as_QE@NJ*1",
    expiresIn: 60 * 60 * 24 * 7
}

export {
    environment,
    database,
    security
};