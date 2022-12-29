/**
 * @author 川
 */


const Koa=require('koa');

const initManager=require('./core/init');

const app=new Koa();

initManager.initCore(app);

app.listen(3030);
console.log("listen in 3030");