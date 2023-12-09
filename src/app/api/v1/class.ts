import Router from 'koa-router';

const router = new Router();

router.prefix('/api');
router.get("/v1/:id/classic/lastest", (ctx: any, next: any) => {
    const path = ctx.params;
    ctx.body = {
        mes: `${ctx.request.method} ${ctx.request.url}`
    };
    
    throw new global.ResModel.ErrorModel(global.ErrorInfo.registerFailInfo,{'url':`${ctx.request.method} ${ctx.request.url}`,'ctx':ctx.response.status});
});

// export = {router:router};
export = router;