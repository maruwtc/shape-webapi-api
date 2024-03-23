import { Pet, PetInput } from "../models/pets.model"

const getAllPets = async (ctx: any) => {
    try {
        const pets = await Pet.find()
        ctx.body = pets
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const getPetById = async (ctx: any) => {
    try {
        const pet = await Pet.findOne({ id: ctx.params.id })
        if (pet) {
            ctx.body = pet
        } else {
            ctx.status = 404
            ctx.body = { message: 'Pet not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const createPet = async (ctx: any) => {
    try {
        const { name, category, age, breed, location, image, description }: PetInput = ctx.request.body
        const smallestusableid = await Pet.find().sort({ id: -1 }).limit(1)
        const pet = new Pet({
            id: smallestusableid[0].id + 1,
            name,
            category,
            age,
            breed,
            location,
            image,
            description
        })
        await pet.save()
        ctx.body = pet
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const updatePet = async (ctx: any) => {
    try {
        const { name, category, age, breed, location, image, description }: PetInput = ctx.request.body
        const pet = await Pet.findOne({ id: ctx.params.id })
        if (pet) {
            pet.name = name
            pet.category = category
            pet.age = age
            pet.breed = breed
            pet.location = location
            pet.image = image
            pet.description = description
            await pet.save()
            ctx.body = pet
        } else {
            ctx.status = 404
            ctx.body = { message: 'Pet not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

const deletePet = async (ctx: any) => {
    try {
        const pet = await Pet.findOne({ id: ctx.params.id })
        if (pet) {
            await pet.deleteOne({ id: ctx.params.id })
            ctx.body = { message: 'Pet deleted' }
        } else {
            ctx.status = 404
            ctx.body = { message: 'Pet not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export { getAllPets, getPetById, createPet, updatePet, deletePet }