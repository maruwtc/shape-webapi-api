import { User, UserInput } from '../models/users.model'
import { hashedPassword } from '../middlewares/hashing'

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
        const smallestUsableId = await User.find().sort({ id: 1 }).limit(1)
        let newId = smallestUsableId[0].id + 1
        while (true) {
            const existingUser = await User.findOne({ id: newId })
            if (!existingUser) {
                break 
            }
            newId++
        }
        const user = new User({
            id: newId,
            name,
            role,
            password: hashedPassword(password),
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
            user.password = hashedPassword(password)
            await user.save()
            ctx.body = user
            ctx.body.__v ++
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