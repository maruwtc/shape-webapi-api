import Koa from 'koa'
import Router, { RouterContext } from 'koa-router'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { connect as ConnectDB } from './config/database'
import { router as firebase } from './routes/v1/auth.route'
import { router as pets } from './routes/v1/pets.route'

const router: Router = new Router()

router.get('/', (ctx: RouterContext) => {
    ctx.body = 'Welcome to the API!'
})

const app: Koa = new Koa()

ConnectDB().catch(console.dir)

app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(router.routes())
app.use(firebase.routes())
app.use(pets.routes())

app.use(async (ctx: RouterContext, next: any) => {
    try {
        await next()
    } catch (err: any) {
        if (ctx.status === 404) {
            ctx.status = 404
            ctx.body = { message: err.message }
        } else {
            ctx.status = err.statusCode || err.status || 500
            ctx.body = { message: err.message }
        }
    }
})

app.listen(8000, () => {
    console.log(`Server is running at port 8000`)
})