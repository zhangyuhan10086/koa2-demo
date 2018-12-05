const {
    Controller,
    Get,
    Post,
    Put,
    Auth,
    Required
} = require("../lib/decorator")
const {
    getAllUsers,
    registerUser,
    checkPassword
} = require("../service/user");

@Controller("/api/user")
export default class UserController {
    @Get("/all")
    async getUsers(ctx, next) {
        const users = await getAllUsers()
        ctx.body = {
            users,
            success: true
        }
    }

    //注册
    @Post("/register")
    @Required({
        body: ['username', 'password']
    })
    async register(ctx, next) {
        let request = ctx.request.body;
        const {
            username,
            password
        } = request;
        let res = await registerUser(username, password);
        if (!res) {
            ctx.body = {
                success: false,
                remark: "改用户名已经存在!"
            }
        } else {
            ctx.body = {
                success: true,
                remark: "注册成功"
            }
        }
    }

    //登录
    @Post("/login")
    @Required({
        body: ['username', 'password']
    })
    async login(ctx, next) {
        const {
            username,
            password
        } = ctx.request.body;
        const data = await checkPassword(username, password)
        const {
            user,
            match
        } = data;
        if (match) {
            let userItem = {
                _id: user._id,
                username: user.username,
                nickname: user.nickname,
                portraitUrl: user.portraitUrl,
                roleCode: user.roleCode,
            }
            ctx.session.user = userItem
            ctx.body = {
                success: true,
                user: userItem,
                remark: "登录成功"
            }
        } else {
            ctx.body = {
                success: false,
                remark: "登录失败，没有该账号或者密码错误"
            }
        }
    }

}


// router.get("/userList", function (ctx, next) {

//     ctx.body = "获取userlist"
// })

// module.exports = router;