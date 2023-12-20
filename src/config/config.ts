
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
const wx={
    appId:"wx562334d229dc0fa0",
    appSecret:"4ef286dc3acf1512dfcd749c197b866a",
    loginUrl:"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
}

export {
    environment,
    database,
    security,
    wx
};