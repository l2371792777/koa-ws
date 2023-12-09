/**
 * @description 数据模型
 */

interface errorInfo {
    errno: number;
    data?: any;
    message?: string;
}

class BaseModel {
    public errno: number;
    public message: string;
    public data: any;
    public addInformation: string;
    constructor(error: errorInfo,addInformation?:any) {
        this.errno = error.errno;
        this.addInformation = addInformation;
        if (error.data) {
            this.data = error.data;
        }
        if (error.message) {
            this.message = error.message;
        }
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
    constructor(error:errorInfo,addInformation?:any) {
        super(error,addInformation)
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor(error:errorInfo,addInformation?:any) {
        super(error,addInformation)
    }
}

export {
    SuccessModel,
    ErrorModel
}