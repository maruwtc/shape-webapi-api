import mongoose, { Model } from "mongoose"

type PetDocument = mongoose.Document & {
    name: string
    age: number
    breed: string
    location: string
    image: string
}

type PetInput = {
    name: PetDocument['name']
    age: PetDocument['age']
    breed: PetDocument['breed']
    location: PetDocument['location']
    image: PetDocument['image']
}

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
})

const Pet: Model<PetDocument> = mongoose.model<PetDocument>('pets', PetSchema)

export { Pet, PetInput, PetDocument }