const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Documentation',
        description: 'This is the API documentation for the API',
    },
    host: 'localhost:8000',
    basePath: '/api/v1',
    schemes: ['http'],
};

const outputFile = './src/docs/swagger.json';
const routes = ['./src/routes/v1/pets.route.ts', './src/routes/v1/users.route.ts', './src/routes/v1/auth.route.ts'];

swaggerAutogen(outputFile, routes, doc)