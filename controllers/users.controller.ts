import crypto from 'crypto'
import { User, UserInput } from '../models/users.model'

const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString('hex')
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

const getAllUsers = async (ctx: any) => {
    try {
        const users = await User.find()
        ctx.body = users
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const getUserById = async (ctx: any) => {
    try {
        const user = await User.findOne({ id: ctx.params.id })
        if (user) {
            ctx.body = user
        } else {
            ctx.status = 404
            ctx.body = { message: 'User not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const createUser = async (ctx: any) => {
    try {
        const { name, role, password }: UserInput = ctx.request.body
        const user = new User({
            id: Math.floor(Math.random() * 100),
            name,
            role,
            password: hashPassword(password)
        })
        await user.save()
        ctx.body = user
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const updateUser = async (ctx: any) => {
    try {
        const { name, role, password }: UserInput = ctx.request.body
        const user = await User.findOne({ id: ctx.params.id })
        if (user) {
            user.name = name
            user.role = role
            user.password = hashPassword(password)
            await user.save()
            ctx.body = user
        } else {
            ctx.status = 404
            ctx.body = { message: 'User not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const deleteUser = async (ctx: any) => {
    try {
        const user = await User.findOne({ id: ctx.params.id })
        if (user) {
            await User.deleteOne({ id: ctx.params.id })
            ctx.body = { message: 'User deleted' }
        } else {
            ctx.status = 404
            ctx.body = { message: 'User not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser }