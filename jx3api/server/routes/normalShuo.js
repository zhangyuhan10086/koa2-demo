const {
    Controller,
    Get,
    Post,
    Auth
} = require("../lib/decorator")
const {
    publishShuo,
    getAllShuo
} = require("../service/normalShuo");

@Controller("/api/normalShuo")
export default class NormalShuoController {
    @Post("/publish")
    @Auth
    async publish(ctx, next) {
        let {
            text,
            imgs
        } = ctx.request.body;
        let publisherId = ctx.session.user._id;
        let res = await publishShuo(publisherId, text, imgs);
        ctx.body = {
            success: true,
            remark: ""
        }
    }
    @Get("/getAll")
    async getAll(ctx, next) {
        let res = await getAllShuo();
        ctx.body = {
            success: true,
            remark: "",
            result: res
        }
    }
}