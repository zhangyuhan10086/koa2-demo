const {
    Controller,
    Get,
    Post,
    Auth,
    Required
} = require("../lib/decorator")
const {
    publishAppearance,
    getAllAppearance
} = require("../service/appearance");

@Controller("/api/appearance")
export default class AppearanceController {
    @Post("/publish")
    @Auth
    @Required({
        body: ['cover', 'imgList', 'appearanceTitle']
    })
    async publish(ctx, next) {
        let {
            cover,
            imgList,
            appearanceTitle,
            appearanceName
        } = ctx.request.body;
        let publisherId = ctx.session.user._id;
        let res = await publishAppearance(publisherId, cover, imgList,appearanceTitle,appearanceName);
        ctx.body = {
            success: true,
            remark: ""
        }
    }
    @Get("/getAll")
    async getAll(ctx, next) {
        let res = await getAllAppearance();
        ctx.body = {
            success: true,
            remark: "",
            result: res
        }
    }
}