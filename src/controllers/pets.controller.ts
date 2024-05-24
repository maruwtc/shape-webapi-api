import { Pet, PetInput } from "../models/pets.model"

export const getAllPets = async (ctx: any) => {
    try {
        const pets = await Pet.find()
        ctx.body = pets
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const getPetById = async (ctx: any) => {
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

export const createPet = async (ctx: any) => {
    try {
        const { name, age, breed, location, image }: PetInput = ctx.request.body.pet
        const pet = new Pet({
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

export const updatePet = async (ctx: any) => {
    try {
        const { name, age, breed, location, image, __v }: PetInput = ctx.request.body.pet
        const pet = await Pet.findOne({ _id: ctx.params.id })
        if (pet) {
            pet.name = name
            pet.age = age
            pet.breed = breed
            pet.location = location
            pet.image = image
            pet.__v = __v + 1
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

export const deletePet = async (ctx: any) => {
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

export const getPetAPIBreedList = async (ctx: any) => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all')
        if (response.ok) {
            const data = await response.json()
            ctx.body = data
        } else {
            ctx.status = 404
            ctx.body = { message: 'API not found' }
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}

export const getPetAPIRandomImage = async (ctx: any) => {
    try {
        const breed = ctx.request.headers.breed
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        if (response.ok) {
            const data = await response.json()
            ctx.body = data
        }
    } catch (error: any) {
        ctx.status = 500
        ctx.body = { message: error.message }
    }
}