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
    checkPassword,
    upDateUser,
    getUserData
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
                ...user._doc
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

    //修改
    @Post("/update")
    @Auth
    @Required({
        body: ['headerImg', 'nickName', 'sex']
    })
    async update(ctx, next) {
        const {
            headerImg,
            nickName,
            sex
        } = ctx.request.body;
        const id = ctx.session.user._id;
        try {
            const res = await upDateUser(id, headerImg, nickName, sex);
            ctx.body = {
                success: true,
                result: "",
                remark: "修改成功"
            }
        } catch (err) {
            ctx.body = {
                success: false,
                remark: err,
                result: ""
            }
        }
    }

    //修改
    @Get("/userInfo")
    @Auth
    async getUserInfo(ctx, next) {
        const id = ctx.session.user._id;
        try {
            const res = await getUserData(id);
            if (res) {
                ctx.body = {
                    success: true,
                    result: res,
                    remark: "获取成功"
                }
            } else {
                ctx.body = {
                    success: false,
                    result: "",
                    remark: "没有该用户"
                }
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


// router.get("/userList", function (ctx, next) {

//     ctx.body = "获取userlist"
// })

// module.exports = router;