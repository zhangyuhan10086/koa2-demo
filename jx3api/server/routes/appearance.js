const {
    Controller,
    Get,
    Post,
    Auth,
    Required
} = require("../lib/decorator")
const {
    publishAppearance,
    getAllAppearance,
    reply,
    getDetail
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
        let res = await publishAppearance(publisherId, cover, imgList, appearanceTitle, appearanceName);
        ctx.body = {
            success: true,
            remark: ""
        }
    }
    @Get("/getAll")
    async getAll(ctx, next) {
        let {
            start,
            limit,
            keyword,
        } = ctx.request.query;
        let res = await getAllAppearance(parseInt(start), parseInt(limit), keyword);
        ctx.body = {
            success: true,
            remark: "",
            result: res
        }
    }

    @Post("/reply")
    @Auth
    @Required({
        body: ['id', 'replyContent']
    })
    async reply(ctx, next) {
        let {
            id,
            replyContent,
        } = ctx.request.body;
        let publisherId = ctx.session.user._id;
        try {
            let res = await reply(publisherId, id, replyContent);
            ctx.body = {
                success: true,
                remark: "",
                result: ""
            }
        } catch (err) {
            ctx.body = {
                success: false,
                remark: err,
                result: ""
            }
        }
    }

    @Get("/detail")
    async getDetailz(ctx, next) {
        let {
            id
        } = ctx.request.query

        try {
            let res = await getDetail(id);
            ctx.body = {
                success: true,
                remark: "",
                result: res
            }
        } catch (err) {
            ctx.body = {
                success: false,
                remark: err,
                result: ""
            }
        }
    }
}