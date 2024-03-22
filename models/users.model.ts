import mongoose, { Schema, Model, Document } from 'mongoose'

type UserDocument = Document & {
    id: string
    name: string
    role: string
    password: string
}

type UserInput = {
    name: UserDocument['name']
    role: UserDocument['role']
    password: UserDocument['password']
}

const UserSchema = new Schema({
    id: { type: Schema.Types.String, required: true, unique: true},
    name: { type: Schema.Types.String, required: true },
    role: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true }
}, { collection: 'users', timestamps: true })

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema)

export { User, UserInput, UserDocument }