const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: '1.0.0',
        title: 'Pet Shelter API',
        description: 'This is a simple CRUD API application made with Koa and documented with Swagger. All operations are not actually performed.',
    },
    servers: [
        {
            url: 'http://localhost:8000/api/v1',
        },
    ],
    tags: [
        {
            name: 'Pets',
            description: 'Operations related to pets'
        },
        {
            name: 'Users',
            description: "Operations related to users. Login and Register operations are not available to try"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const outputFile = './src/docs/swagger.json';
const endpointsFiles = ['./src/routes/v1/pets.route.ts', './src/routes/v1/users.route.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
