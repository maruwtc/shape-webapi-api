import * as mongoose from 'mongoose'
import { config } from '../../config'

const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DB

const uri = `mongodb+srv://${config.mongodb_user}:${config.mongodb_password}@${config.mongodb_db}.4eilgsx.mongodb.net/${config.mongodb_db}`

export const connect = async () => {
    try {
        await mongoose.connect(uri)
        console.log('Successfully connected to MongoDB!')
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error)
    }
}

export const disconnect = async () => {
    try {
        await mongoose.disconnect()
        console.log('Successfully disconnected from MongoDB!')
    } catch (error) {
        console.error('Error disconnecting from MongoDB: ', error)
    }
}