import Koa from 'koa';
import Router, { RouterContext } from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { connect as ConnectDB } from './config/database';
import { router as indexRouter } from './routes/v1/index.route';
import { koaSwagger } from 'koa2-swagger-ui';

const router: Router = new Router();

router.get('/', (ctx: RouterContext) => {
    ctx.body = 'Welcome to the API!';
});

const app: Koa = new Koa();

ConnectDB().catch(console.dir);

app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());
app.use(indexRouter.routes());

app.use(
    koaSwagger({
        routePrefix: '/docs',
        swaggerOptions: {
            spec: require('./docs/swagger.json'),
        },
    })
);

app.use(async (ctx: RouterContext, next: any) => {
    try {
        await next();
    } catch (err: any) {
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { message: err.message };
        } else {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = { message: err.message };
        }
    }
});

app.listen(8000, () => {
    console.log('Server is running at port 8000');
});