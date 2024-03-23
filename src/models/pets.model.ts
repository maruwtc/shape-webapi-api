import mongoose, { Model } from "mongoose"

type PetDocument = mongoose.Document & {
    id: number
    name: string
    category: string
    age: number
    breed: string
    location: string
    image: string
    description: string
}

type PetInput = {
    name: PetDocument['name']
    category: PetDocument['category']
    age: PetDocument['age']
    breed: PetDocument['breed']
    location: PetDocument['location']
    image: PetDocument['image']
    description: PetDocument['description']
}

const PetSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, required: true },
    category: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
})

const Pet: Model<PetDocument> = mongoose.model<PetDocument>('pets', PetSchema)

export { Pet, PetInput, PetDocument }