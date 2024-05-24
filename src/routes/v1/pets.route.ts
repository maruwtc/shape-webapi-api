import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getAllPets, getPetById, createPet, updatePet, deletePet, getPetAPIBreedList, getPetAPIRandomImage } from '../../controllers/pets.controller'
import { isAuthorized } from '../../middlewares/firebase'

const router = new Router()

router.get('/pets', (ctx) => {
    // #swagger.tags = ['Pets']
    return getAllPets(ctx)
})

router.get('/pets/:id', isAuthorized, (ctx) => {
    // #swagger.tags = ['Pets']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    return getPetById(ctx)
})

router.post('/pets', isAuthorized, bodyParser(), (ctx) => {
    // #swagger.tags = ['Pets']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    return createPet(ctx)
})

router.put('/pets/:id', isAuthorized, bodyParser(), (ctx) => {
    // #swagger.tags = ['Pets']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    return updatePet(ctx)
})

router.delete('/pets/:id', isAuthorized, (ctx) => {
    // #swagger.tags = ['Pets']
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    return deletePet(ctx)
})

router.get('/petapi/breeds', (ctx) => {
    // #swagger.tags = ['Pets']
    return getPetAPIBreedList(ctx)
})

router.get('/petapi/breed', bodyParser(), (ctx) => {
    // #swagger.tags = ['Pets']
    return getPetAPIRandomImage(ctx)
})

export { router }