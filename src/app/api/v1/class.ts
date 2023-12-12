import Router from 'koa-router';
import Joi from 'joi';
import { PositiveIntegerValidator } from '../../validators/validator';

const router = new Router();

router.prefix('/api');
router.get("/v1/:id/classic/lastest", (ctx: any, next: any) => {
    const path = ctx.params;
    let res: Joi.ValidationResult<any> = new PositiveIntegerValidator().validator(ctx);
    ctx.body = {
        ctx: res
    };

});

// export = {router:router};
export default router;