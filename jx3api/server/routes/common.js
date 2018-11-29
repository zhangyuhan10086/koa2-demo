const {
    Controller,
    Get
} = require("../lib/decorator")
const {
    getQiniuToken,
} = require("../lib/qiniu");

@Controller("/api/qiniu")
export default class qiniuAbout {
    @Get("/getToken")
    async getToken(ctx, next) {
        let qiniuToken = getQiniuToken();
        if (qiniuToken) {
            ctx.body = {
                success: true,
                token: qiniuToken,
                remark: ""
            }
        } else {
            ctx.body = {
                success: false,
                remark: "七牛token获取失败"
            }
        }
    }
}