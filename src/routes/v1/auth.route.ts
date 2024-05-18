import Router from 'koa-router'
import { handleLogin, handleSignout, handleRegister, isAuthorized, getUser } from '../../middlewares/firebase'
import bodyParser from 'koa-bodyparser'

const router = new Router({ prefix: '/api/v1' })

router.post('/signin', bodyParser(), handleLogin)
router.post('/signout', bodyParser(), handleSignout)
router.post('/register', bodyParser(), handleRegister)
router.post('/checkauth', bodyParser(), isAuthorized)
router.post('/getuser', bodyParser(), getUser)

export { router }