const {
    Controller,
    Get,
    Post,
    Put,
    Auth
} = require("../lib/decorator")
const {
    getAllUsers,
    registerUser,
    checkPassword
} = require("../service/user");

@Controller("/api/user")
export default class UserController {
    @Get("/all")
    @Auth
    async getUsers(ctx, next) {
        const users = await getAllUsers()
        ctx.body = {
            users
        }
    }
    @Post("/register")
    async register(ctx, next) {
        let request = ctx.request.body;
        let res = await registerUser(request);
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
    @Post("/login")
    async register(ctx, next) {
        const {
            username,
            password
        } = ctx.request.body;
        const data = await checkPassword(username, password)
        const {
            user,
            match
        } = data;

        ctx.session.user = {
            _id: user._id,
            username: user.username
        };
        if(match){
            ctx.body = {
                success: true,
                username: user.username,
                remark:"登录成功"
            }
        }else{
            ctx.body = {
                success: false,
                remark:"登录失败，没有改账号或者密码错误"
            }
        }
    }
}


// router.get("/userList", function (ctx, next) {

//     ctx.body = "获取userlist"
// })

// module.exports = router;