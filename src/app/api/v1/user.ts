import Router from 'koa-router';
import Joi from 'joi';
import { RegisterValidator } from '../../validators/validator';

const router = new Router();

router.prefix('/api/v1/user');
router.post("/register", (ctx: any, next: any) => {
    //email password nickname
    let res:Joi.ValidationResult<any>=new RegisterValidator().validator(ctx);
    ctx.body={
        ctx:res,
        type:typeof ctx
    }
});

export default router;