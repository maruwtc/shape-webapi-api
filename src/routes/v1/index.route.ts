import Router from 'koa-router';
import { router as authRouter } from './auth.route';
import { router as petsRouter } from './pets.route';
import { router as usersRouter } from './users.route';

const router = new Router({ prefix: '/api/v1' });

router.use(authRouter.routes());
router.use(petsRouter.routes());
router.use(usersRouter.routes());

export { router };