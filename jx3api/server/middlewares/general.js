import bodyParser from 'koa-bodyparser'; //请求体解析模块
import session from 'koa-session'

export const addBodyParser = app => {
    app.use(bodyParser())
}

export const addSession = app => {
    app.keys=["jx3cp"];
    const CONFIG={
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: false, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
    }
    app.use(session(CONFIG,app) )
}