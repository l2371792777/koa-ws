/**
 * @author 川
 */

import Koa from 'koa';
import init from './core/init';

const app = new Koa();

init.initroute(app);

app.listen(3030);
console.log("listen in 3030");