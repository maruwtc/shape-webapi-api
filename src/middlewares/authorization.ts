import bcrypt from 'bcrypt'
import passport from 'koa-passport'
import { BasicStrategy } from 'passport-http'
import { RouterContext } from 'koa-router'
import { User } from '../models/users.model'

passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ name: username })
        if (!user) {
            console.error('User not found')
            return done(null, false)
        }
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user)
        } else {
            console.error('Invalid password')
            return done(null, false)
        }
    } catch (err) {
        console.error(err)
        return done(err)
    }
}))

export const basicAuth = async (ctx: RouterContext, next: any) => {
    await passport.authenticate('basic', { session: false })(ctx, next)
    if (ctx.status === 401) {
        ctx.body = { message: 'Unauthorized' }
    }
}