import Router from 'koa-router';

let router = new Router();

router.prefix('/api');
router.get("/list", (ctx: any, next: any) => {
    ctx.body = {
        mes: "hello"
    };
});

export = router;