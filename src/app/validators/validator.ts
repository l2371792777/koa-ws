import Joi from 'joi';

class baseValidator {
    protected schema: Joi.ObjectSchema<any>;
    protected errorInfo: any;
    constructor() {
    }
    extractData(data: any): any {
        return data;
    }
    validator(data: any): Joi.ValidationResult<any> {
        let validationResult: Joi.ValidationResult<any> = this.schema.validate(this.extractData(data));
        if (validationResult.error) {
            throw new global.ResModel.ErrorModel(this.errorInfo);
        }
        return validationResult;
    }
}

class HttpValidator extends baseValidator {
    validator(ctx: any): Joi.ValidationResult<any> {
        let validationResult: Joi.ValidationResult<any> = this.schema.validate(this.extractData(ctx));
        if (validationResult.error) {
            this.errorInfo.data=validationResult.error;
            throw new global.ResModel.ErrorModel(this.errorInfo, ctx);
        }
        return validationResult;
    }
    extractData(ctx: object): object {
        return ctx;
    }
}
class PositiveIntegerValidator extends HttpValidator {
    constructor() {
        super();
        this.schema = Joi.object({
            id: Joi.number().integer().min(1).required()
        });
        this.errorInfo=global.ErrorInfo.registerFailInfo;
    }
    extractData(ctx: object):object {
        return {
            id: ctx["params"]["id"]
        }
    }
}

class RegisterValidator extends HttpValidator {
    constructor() {
        super();
        this.schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)
                .message('密码必须包含至少一个字母和一个数字').required(),
            nickname: Joi.string().alphanum().min(2).max(16).message('昵称只能包含字母和数字,长度在2到8个字符之间').required()
        })
        this.errorInfo=global.ErrorInfo.registerFailInfo;
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

export {
    PositiveIntegerValidator,
    RegisterValidator
}