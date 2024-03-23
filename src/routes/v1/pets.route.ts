import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../../controllers/pets.controller'
import { validatePet } from '../../validations/validation'

const router = new Router({ prefix: '/v1' })

router.get('/pets', getAllPets)
router.get('/pets/:id', getPetById)
router.post('/pets', bodyParser(), validatePet, createPet)
router.put('/pets/:id', updatePet)
router.delete('/pets/:id', deletePet)

export { router }