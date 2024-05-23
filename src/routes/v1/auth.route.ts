import Router from 'koa-router'
import { handleLogin, handleRegister, isAuth, isAdmin, getUser, deleteUser, uploadImage } from '../../middlewares/firebase'
import bodyParser from 'koa-bodyparser'

const router = new Router()

router.post('/signin', bodyParser(), handleLogin)
router.post('/register', bodyParser(), handleRegister)
router.post('/checkauth', bodyParser(), isAuth)
router.post('/checkadmin', bodyParser(), isAdmin)
router.post('/getuser', bodyParser(), getUser)
router.post('/deleteaccount', bodyParser(), deleteUser)
router.post('/uploadimage', uploadImage)

export { router }