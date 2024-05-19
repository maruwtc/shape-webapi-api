import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getUserWishlist, addUserWishlist, removeUserWishlist } from '../../controllers/users.controller'
import { isAuthorized } from '../../middlewares/firebase'

const router = new Router({ prefix: '/api/v1' })

router.get('/users/:userid/wishlist', isAuthorized, getUserWishlist)
router.put('/users/:userid/wishlist', isAuthorized, bodyParser(), addUserWishlist)
router.delete('/users/:userid/wishlist', isAuthorized, bodyParser(), removeUserWishlist)

export { router }