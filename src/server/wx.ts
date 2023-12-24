import axios from "axios";
import { wx } from "../config/config";
import util from "util";
import { createByOpenId, findByOpenId } from "./user";

class wxManager {
    /**
     * 微信code生成openid
     * @param code wx.code
     * @returns 
     */
    static async codeToToken(code: string): Promise<any> {
        const url: string = util.format(wx.loginUrl, wx.appId, wx.appSecret, code);
        const result = await axios.get(url);
        if (result.status !== 200) {
            throw new global.ResModel.ErrorModel(global.ErrorInfo.authVerifyInfo).setMessage("openid获取失败");
        }
        if (result.data.errcode && result.data.errcode !== 0) {
            throw new global.ResModel.ErrorModel(global.ErrorInfo.authVerifyInfo).setMessage("openid获取失败: " + result.data.errcode);
        }
        let user = await findByOpenId(result.data.openid);
        if (!user) {
            user = await createByOpenId(result.data.openid);
        }
        return user;
    }
}

export default wxManager;