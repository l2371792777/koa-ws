interface resInfo {
    errno: number;
    data?: any;
    message?: string;
}

class BaseModel {
    public errno: number;
    public message: string;
    public data: any;
    constructor(res: resInfo = { errno: 0, data: "no mes" }) {
        this.errno = res.errno;
        if (res.data) {
            this.data = res.data;
        }
        if (res.message) {
            this.message = res.message;
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(data: any) {
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
        this.url = `${ctx.request.method} ${ctx.request.url}`;
    }
}
export {
    SuccessModel,
    ErrorModel
}
