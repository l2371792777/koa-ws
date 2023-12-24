import Router from 'koa-router';
import { TokenValidator, NotEmptyValidator } from '../../validators/validator';
import Joi from 'joi';
import { login } from "../../../controller/user";
import Auth from '../../../middlewares/auth';

const router = new Router();
router.prefix('/api/v1/token');

router.post("/", async (ctx: any, next: any) => {
    let res: Joi.ValidationResult<any> = new TokenValidator().validator(ctx);
    let token: string = await login(res.value);
    throw new global.ResModel.SuccessModel({ token: token });
});
router.get("/verify",new Auth(Auth.USER).verify, async (ctx: any, next: any) => {
    ctx.body = "true";
});

export default router;