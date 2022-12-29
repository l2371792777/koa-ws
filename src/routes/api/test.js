const Router=require('koa-router');

let router=new Router;

router.prefix('/api');
router.get("/list",(ctx,next)=>{
    ctx.body={
        mes:"hello"
    };
});

module.exports=router;