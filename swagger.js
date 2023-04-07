const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };
  
  const outputFile = './Swagger.json';
  const endpointsFiles = ['./endpointsUser.js'];
  
  swaggerAutogen(outputFile, endpointsFiles, doc);