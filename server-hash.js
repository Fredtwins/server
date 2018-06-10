// hash 路由的服务器配置项
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaSend = require('koa-send')

const app = new Koa()

// 中间件
// 用来解决当用户访问 /sanfang 时, 自动重定向到 /sanfang/
app.use(async (ctx, next) => {
  if (ctx.request.url === '/sanfang') {
    ctx.response.redirect('/sanfang/')
  } else {
    await next()
  }
})

const staticRouter = new KoaRouter({
  prefix: '/sanfang/static'
})
staticRouter.get('/*', async (ctx, next) => {
  await KoaSend(ctx, ctx.path)
})
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

const pageRouter = new KoaRouter({
  prefix: '/sanfang'
})
pageRouter.get('/*', async (ctx, next) => {
  ctx.headers['Content-type'] = 'text/html'
  ctx.body = fs.readFileSync(path.join(__dirname, './sanfang/index.html'), 'utf-8')
  await next()
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen('3333', () => {
  console.log('listening at http://localhost:3333')
})