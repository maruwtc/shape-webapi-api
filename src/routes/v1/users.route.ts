import Router from 'koa-router'
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/users.controller'

const router = new Router()

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export { router }