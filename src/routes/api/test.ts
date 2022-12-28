import Router from 'koa-router';

let router=new Router;

router.prefix('/api');
router.get("/list",(ctx,next)=>{
    ctx.body="end";
});

export default router;