interface resInfo {
    code?: number;
    errno: number;
    data?: any;
    message?: string;
}

class BaseModel {
    public code: number;
    public errno: number;
    public message: string;
    public data: any;
    constructor(res: resInfo) {
        this.errno = res.errno || 205;
        this.setData(res.data);
        this.setMessage(res.message);
        this.setCode(res.code);
    }
    setData(data?: any): BaseModel {
        this.data = data || "no date";
        return this;
    }
    setMessage(message?: any): BaseModel {
        this.message = message || "no message";
        return this;
    }
    setCode(code?: number): BaseModel {
        if (code) {
            this.code = code;
        }
        return this;
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data: any = "no data") {
        super({ errno: 0, data: data })
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    private url: string;
    constructor(res: resInfo, ctx?: any) {
        super(res);
        this.setCtx(ctx);
    }
    setCtx(ctx?: any): ErrorModel {
        if (ctx) {
            this.url = `${ctx.request.method} ${ctx.request.url}`;
        }
        return this;
    }
}
export {
    resInfo,
    BaseModel,
    SuccessModel,
    ErrorModel
}
