import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../../controllers/pets.controller'
import { basicAuth } from '../../middlewares/authorization'

const router = new Router({ prefix: '/api/v1' })

router.get('/pets', getAllPets)
router.get('/pets/:id', getPetById)
router.post('/pets', basicAuth, bodyParser(), createPet)
router.put('/pets/:id', basicAuth, bodyParser(), updatePet)
router.delete('/pets/:id', basicAuth, deletePet)

export { router }