import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/users.controller'
import { validateUser } from '../../validations/validation'
import { basicAuth } from '../../middlewares/authorization'

const router = new Router({ prefix: '/api/v1' })

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', basicAuth, bodyParser(), validateUser, createUser)
router.put('/users/:id', basicAuth, bodyParser(), validateUser, updateUser)
router.delete('/users/:id', basicAuth, deleteUser)

export { router }