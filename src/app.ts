/**
 * @author 川
 */

import Koa from 'koa';
import koaBody from 'koa-body';
import initManager from './core/init';
import catchError from './middlewares/exception'

const app = new Koa();

app.use(koaBody());
app.use(catchError);

initManager.initCore(app);

app.listen(3030);
console.log("listen in 3030");