// history 路由的服务器配置项
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaSend = require('koa-send')

const app = new Koa()

// 匹配静态资源的router
const staticRouter = new KoaRouter({
  // 匹配路径为 /static
  prefix: '/static'
})
// 只要访问/static/下的所有东西, 进来这个路由
staticRouter.get('/*', async (ctx, next) => {
  // 把访问的到静态资源直接发送去客户端
  await KoaSend(ctx, ctx.path)
})
// 让app使用上staticRouter下面所有定义的路由, 和使用上所有methods(get, post, ....)
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

// 匹配网页index.html的路由
const pageRouter = new KoaRouter({
  // 匹配路径为 /
  prefix: '/'
})
// 只要访问 / 下所有的东西, 进来这个路由
pageRouter.get('*', async (ctx, next) => {
  // 声明头部信息, 让客户端知道返回的东西是个html页面
  ctx.headers['Content-type'] = 'text/html'
  // 通过fs模块去读取文件内容, 再把它返回到客户端
  ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')
  // 返回后, 执行下一步
  await next()
})
// 让app使用上pageRouter下面所有定义的路由, 和使用上所有methods(get, post, ....)
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen('3333', () => {
  console.log('listening at http://localhost:3333')
})