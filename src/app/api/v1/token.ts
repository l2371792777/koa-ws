import Router from 'koa-router';
import { TokenValidator } from '../../validators/validator';
import Joi from 'joi';
import {login} from "../../../controller/user";

const router = new Router();
router.prefix('/api/v1/user');

router.post("/token", async (ctx: any, next: any) => {
    let res: Joi.ValidationResult<any> = new TokenValidator().validator(ctx);
    let token:string=await login(res.value);
    throw new global.ResModel.SuccessModel(res).setMessage(token);
});

export default router;