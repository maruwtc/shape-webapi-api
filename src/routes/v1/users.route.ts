import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { handleLogin, handleRegister, isAuth, isAdmin, getUser, deleteUser, uploadImage } from '../../middlewares/firebase'
import { getUserWishlist, addUserWishlist, removeUserWishlist } from '../../controllers/users.controller'
import { isAuthorized } from '../../middlewares/firebase'

const router = new Router()

router.post('/user/signin', bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return handleLogin(ctx)
})

router.post('/user/register', bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    return handleRegister(ctx)
})

router.post('/user/checkauth', bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return isAuth(ctx)
})

router.post('/user/checkadmin', bodyParser(), (ctx, next) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return isAdmin(ctx, next)
})

router.post('/user/getuser', bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    return getUser(ctx)
})

router.post('/user/deleteaccount', bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return deleteUser(ctx)
})

router.post('/user/uploadimage', (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return uploadImage(ctx)
})

router.get('/user/:userid/wishlist', isAuthorized, (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return getUserWishlist(ctx)
})

router.put('/user/:userid/wishlist', isAuthorized, bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return addUserWishlist(ctx)
})

router.delete('/user/:userid/wishlist', isAuthorized, bodyParser(), (ctx) => {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
        "bearerAuth": []
    }] */
    return removeUserWishlist(ctx)
})

export { router }
