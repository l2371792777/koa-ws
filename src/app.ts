/**
 * @author 川
 */


import Koa from 'koa';
import Router from 'koa-router';

let app=new Koa();
let router=new Router();

app.use(router.routes());

app.listen(3030);
console.log("OK");