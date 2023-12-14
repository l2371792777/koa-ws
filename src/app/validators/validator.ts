import Joi from 'joi';

class baseValidator {
    protected schema: Joi.ObjectSchema<any>;
    protected errorInfo: any;
    constructor() {
        this.errorInfo = {
            errorno: 205,
            message: "undefined"
        }
    }
    extractData(data: any): any {
        return data;
    }
    errorValidator(validationResult: Joi.ValidationResult<any>): Joi.ValidationResult<any> {
        if (validationResult.error) {
            this.errorInfo.data = validationResult;
            throw new global.ResModel.ErrorModel(this.errorInfo);
        }
        return validationResult;
    };
    validator(data: any): Joi.ValidationResult<any> {
        const validationResult: Joi.ValidationResult<any> = this.schema.validate(this.extractData(data));
        return this.errorValidator(validationResult);
    }
}

/** 
 * 验证id
 */
class PositiveIntegerValidator extends baseValidator {
    constructor() {
        super();
        this.schema = Joi.object({
            id: Joi.number().integer().min(1).required()
        });
        this.errorInfo = global.ErrorInfo.registerFailInfo;
    }
    extractData(ctx: object): object {
        return {
            id: ctx["params"]["id"]
        }
    }
}

/** 
 * 验证注册信息
 */
class RegisterValidator extends baseValidator {
    constructor() {
        super();
        this.schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)
                .message('密码必须包含至少一个字母和一个数字').required(),
            nickname: Joi.string().alphanum().min(2).max(16).message('昵称只能包含字母和数字,长度在2到8个字符之间').required()
        })
        this.errorInfo = global.ErrorInfo.registerFailInfo;
    }
    extractData(ctx: object): object {
        const body = ctx["request"].body;
        return {
            email: body.email,
            password: body.password,
            nickname: body.nickname
        }
    }
}

enum LoginType {
    USER_MINI_PROGRAM = 100,
    USER_EMAIL = 101,
    USER_MOBILE = 102,
    ADMIN_EMAIL = 200
}
class TokenValidator extends baseValidator {
    constructor() {
        super();
        this.schema = Joi.object({
            account: Joi.string().email().required(),
            secret: Joi.string().optional().min(6),
            type: Joi.number().valid(...Object.values(LoginType)).required()
        })
        this.errorInfo = global.ErrorInfo.registerFailInfo;
    }
    validator(ctx: any): Joi.ValidationResult<any> {
        let validationResult: Joi.ValidationResult<any> = this.schema.validate(this.extractData(ctx));
        return this.errorValidator(validationResult);
    }
    extractData(ctx: object): object {
        const body = ctx["request"].body;
        return {
            account: body.account,
            secret: body.secret,
            type: body.type
        }
    }
}

export {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    LoginType
}