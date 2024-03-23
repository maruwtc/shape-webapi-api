import Router from 'koa-router'
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../controllers/pets.controller'

const router = new Router()

router.get('/pets', getAllPets)
router.get('/pets/:id', getPetById)
router.post('/pets', createPet)
router.put('/pets/:id', updatePet)
router.delete('/pets/:id', deletePet)

export { router }