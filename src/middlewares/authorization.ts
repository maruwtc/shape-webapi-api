import passport from 'koa-passport'
import crypto from 'crypto'
import { BasicStrategy } from 'passport-http'
import { RouterContext } from 'koa-router'
import { User } from '../models/users.model'

const verifyUser = (user: any, password: any) => {
    return user.password === crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
}

passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ name: username })
        if (!user) {
            console.error('User not found')
            return done(null, false)
        }
        if (verifyUser(user, password)) {
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
        ctx.body = 'Unauthorized'
    }
}