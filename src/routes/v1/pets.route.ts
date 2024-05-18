import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../../controllers/pets.controller'
import { isAuthorized } from '../../middlewares/firebase'

const router = new Router({ prefix: '/api/v1' })

router.get('/pets', getAllPets)
router.get('/pets/:id', isAuthorized, getPetById)
router.post('/pets', isAuthorized, bodyParser(), createPet)
router.put('/pets/:id', isAuthorized, bodyParser(), updatePet)
router.delete('/pets/:id', isAuthorized, deletePet)

export { router }