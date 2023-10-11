import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serverMessage from './constants/serverMessage.js'
import AppRoutes from './routes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  try {
    ctx.body = serverMessage.SERVER_RUN_SUCCESS
    await next()
  } catch (err) {
    ctx.body = {err: err.message}
    ctx.status = 500
    ctx.body = {err: serverMessage.ITERNAL_SERVER_ERROR}
  }
})

app.keys = ['secret-key']
app.use(errorHandler).use(cors()).use(bodyParser()).use(router.routes()).use(router.allowedMethods())

AppRoutes.forEach((route) => router[route.method](route.path, route.action))

async function main() {
  try {
    app.listen(8080, () => {
      console.log(serverMessage.SERVER_RUN_SUCCESS)
    })
  } catch (err) {
    console.error(serverMessage.SERVER_RUN_SUCCESS, err)
  }
}

main()
