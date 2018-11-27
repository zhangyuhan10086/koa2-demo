const Koa = require("koa");
const R = require("ramda")
const cors = require('koa-cors');
import config from "../config";

const {
    resolve
} = require("path")
const MIDDLEWARES = ["database", "general", 'router']



//这个中间件的目的就是把 middlewares文件下面的文件按 MIDDLEWARES数组的需要引入然后依次传入app 执行一次
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => {
                    initWith(app)
                }
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        ))(MIDDLEWARES)
}
async function start() {
    const app = new Koa();
    const {
        port
    } = config
    //解决 跨域
    app.use(cors());

    await useMiddlewares(app)

    const server = app.listen(port, () => {
        console.log(`服务器已经启动在${port}端口`)
    })

    //引入爬虫
    //require(resolve(__dirname, `./crawler/doubanUser`));

}
start();