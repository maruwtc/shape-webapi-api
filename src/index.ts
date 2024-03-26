import Koa from 'koa'
import Router, { RouterContext } from 'koa-router'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import cors from '@koa/cors'
import * as dotenv from 'dotenv'
import { connect as ConnectDB } from './config/database'
import { router as users } from './routes/v1/users.route'
import { router as pets } from './routes/v1/pets.route'

const router: Router = new Router()

router.get('/', (ctx: RouterContext) => {
    ctx.body = 'Welcome to the API!'
})

const app: Koa = new Koa()

dotenv.config()
ConnectDB().catch(console.dir)

app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(passport.initialize())
app.use(router.routes())
app.use(users.routes())
app.use(pets.routes())

app.use(async (ctx: RouterContext, next: any) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.status = 404
            ctx.body = 'Page not found'
        }
    } catch (err: any) {
        ctx.body = { message: err.message }
    }
})

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at port ${process.env.SERVER_PORT}`)
})