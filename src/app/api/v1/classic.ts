import Router from 'koa-router';
import Auth from '../../../middlewares/auth';
import { latest } from '../../../controller/flow';

const router = new Router();
router.prefix('/api/v1/classic');
router.get("/latest", new Auth().verify, async (ctx: any, next: any) => {
    let result:any=await latest();
    throw new global.ResModel.SuccessModel(result);
});

export default router;