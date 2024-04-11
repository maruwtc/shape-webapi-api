import mongoose, { Model } from 'mongoose'

type UserDocument = mongoose.Document & {
    id: number
    name: string
    // role: string
    password: string
}

type UserInput = {
    name: UserDocument['name']
    // role: UserDocument['role']
    password: UserDocument['password']
}

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true, unique: true},
    // role: { type: String, required: true },
    password: { type: String, required: true },
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('users', UserSchema)

export { User, UserInput, UserDocument }