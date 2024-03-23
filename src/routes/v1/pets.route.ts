import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../../controllers/pets.controller'
import { validatePet } from '../../validations/validation'
import { basicAuth } from '../../middlewares/authorization'

const router = new Router({ prefix: '/api/v1' })

router.get('/pets', getAllPets)
router.get('/pets/:id', getPetById)
router.post('/pets', basicAuth, bodyParser(), validatePet, createPet)
router.put('/pets/:id', basicAuth, bodyParser(), validatePet, updatePet)
router.delete('/pets/:id', basicAuth, deletePet)

export { router }