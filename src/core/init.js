const requireDirectory=require('require-directory');
const Router=require('koa-router');

class initManager{
    static initCore(app){
        initManager.app=app;
        this.initLoaderRouter();
    }
    static initLoaderRouter(){
        const routerDirectory=`${process.cwd()}/src/routes/`;
        const modules=requireDirectory(module,routerDirectory,{
            visit: whenLOadModule
        });
        function whenLOadModule(obj) {
            if (obj instanceof Router) {
                initManager.app.use(obj.routes());
            }

        }
    }
}

module.exports=initManager