import mongoose, { Model } from "mongoose"

type UserDocument = mongoose.Document & {
    userid: string
    wishlist: string[]
}

type UserInput = {
    userid: UserDocument['userid']
    wishlist: UserDocument['wishlist']
}

const UserSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    wishlist: { type: Array, required: false }
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('users', UserSchema)

export { User, UserInput, UserDocument }