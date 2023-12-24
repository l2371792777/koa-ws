import Router from 'koa-router';
import Auth from '../../../middlewares/auth';

const router = new Router();
router.prefix('/api/v1/classic');
router.get("/latest", new Auth().verify, async (ctx: any, next: any) => {
});

export default router;