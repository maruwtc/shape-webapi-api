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
        const pet = await Pet.findOne({ _id: ctx.params.id })
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
        const { name, age, breed, location, image }: PetInput = ctx.request.body.pet
        // const smallestusableid = await Pet.find().sort({ id: -1 }).limit(1)
        const pet = new Pet({
            // id: smallestusableid[0].id + 1,
            name,
            age,
            breed,
            location,
            image,
        })
        await pet.save()
        ctx.body = pet
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
        if (error.message.includes('duplicate key error')) {
            ctx.status = 400
            ctx.body = { message: error.message }
        } else if (error.message.includes('pets validation failed')) {
            ctx.status = 400
            ctx.body = { message: 'Missing required fields' }
        }
    }
}

const updatePet = async (ctx: any) => {
    try {
        const { name, age, breed, location, image }: PetInput = ctx.request.body
        const pet = await Pet.findOne({ _id: ctx.params.id })
        if (pet) {
            pet.name = name
            pet.age = age
            pet.breed = breed
            pet.location = location
            pet.image = image
            await pet.save()
            ctx.body = pet
            ctx.body.__v ++
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
        const pet = await Pet.findOne({ _id: ctx.params.id })
        if (pet) {
            await pet.deleteOne({ _id: ctx.params.id })
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