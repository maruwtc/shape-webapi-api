import * as mongoose from 'mongoose'
import { config } from 'dotenv'

const { parsed } = config()
const user = parsed?.MONGODB_USER
const password = parsed?.MONGODB_PASSWORD
const dbName = parsed?.MONGODB_DB

const uri = `mongodb+srv://${user}:${password}@${dbName}.4eilgsx.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`

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