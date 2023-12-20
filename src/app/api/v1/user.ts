import Router from 'koa-router';
import Joi from 'joi';
import { RegisterValidator } from '../../validators/validator';
import { createUser } from '../../../controller/user';
import Auth from '../../../middlewares/auth';

const router = new Router();

router.prefix('/api/v1/user');
router.post("/register", async (ctx: any, next: any) => {
    //email password nickname
    let res:Joi.ValidationResult<any>=new RegisterValidator().validator(ctx);
    let result=await createUser(res.value);
    throw new global.ResModel.SuccessModel(result);
});

router.post("/login",new Auth(Auth.USER).verify,async (ctx:any,next:any)=>{
    ctx.body=ctx.auth;
});

export default router;