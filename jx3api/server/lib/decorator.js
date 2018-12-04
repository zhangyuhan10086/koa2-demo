const Router = require("koa-router")
const {
    resolve
} = require("path")
const _ = require("lodash")
const glob = require("glob")
import R from 'ramda'
const symbolPrefix = Symbol("prefix")
const routerMap = new Map()

const isArray = c => _.isArray(c) ? c : [c]

const changeToArr = R.unless(
    R.is(Array),
    R.of
)




export class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }
    init() {
        //同步引入routes里面的js
        glob.sync(resolve(this.apiPath, "**/*.js")).forEach(require)
        for (let [conf, controller] of routerMap) {
            //conf,map的key ，， controller=》 map的value，即请求每个接口之后执行的方法

            const controllers = isArray(controller)
            const prefixPath = conf.target[symbolPrefix]
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath)
            };
            //把路由请求路径拼全，控制域 + 请求的路径
            const routerPath = prefixPath + conf.path;
            // ...controllers 依次执行回调
            this.router[conf.method](routerPath, ...controllers)
        }

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}


//这个函数的目的就是把 target[key]的 controllers 加上   convert（）传入的方法
export const convert = middleware => (target, key, descriptor) => {
    target[key] = R.compose(
        R.concat(
            changeToArr(middleware)
        ),
        changeToArr
    )(target[key])
    return descriptor
}



const normalizePath = path => path.startsWith("/") ? path : `/${path}`


const router = conf => (target, key, descriptor) => {
    conf.path = normalizePath(conf.path)

    routerMap.set({
        target: target,
        ...conf
    }, target[key]);
}





export const Controller = path => target => (target.prototype[symbolPrefix] = path)

export const Get = path => {
    return router({
        method: "get",
        path: path
    })
}

export const Post = path => router({
    method: "post",
    path: path
})

export const Put = path => router({
    method: "put",
    path: path
})

export const Del = path => router({
    method: "del",
    path: path
})

export const Use = path => router({
    method: "use",
    path: path
})

export const All = path => router({
    method: "all",
    path: path
})


//加上改修饰器时 就会先验证
export const Auth = convert(async (ctx, next) => {
    if (!ctx.session.user) {

        return (
            ctx.body = {
                success: false,
                code: 401,
                remark: '登陆信息已失效, 请重新登陆'
            }
        )
    }
    await next()
})