/**
 * @author 川
 */


import Koa from 'koa';
import testApiRouter from "./routes/api/test";

let app=new Koa();

app.use(testApiRouter.routes());


app.listen(3030);
console.log("listen in 3030");