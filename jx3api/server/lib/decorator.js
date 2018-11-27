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
            const controllers = isArray(controller)
            const prefixPath = conf.target[symbolPrefix]
            if (prefixPath) {
                prefixPath = normalizePath(prefixPath)
            }
            const routerPath = prefixPath + conf.path;
            this.router[conf.method](routerPath, ...controllers)
        }

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}

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
    }, target[key])
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

export const Auth = convert(async (ctx, next) => {
    console.log( ctx.session )
    if (!ctx.session.user) {
        return (
            ctx.body = {
                success: false,
                errCode: 401,
                errMsg: '登陆信息已失效, 请重新登陆'
            }
        )
    }
    await next()
})