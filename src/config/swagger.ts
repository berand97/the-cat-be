import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from './config.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cat Breeds API',
      version: '1.0.0',
      description: 'A comprehensive API for cat breeds information using Clean Architecture with TypeScript, Express, and MongoDB',
      contact: {
        name: 'API Support',
        email: 'support@catbreedsapi.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://${config.server.host}:${config.server.port}`,
        description: 'Development server'
      },
      {
        url: 'https://api.catbreeds.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Breed: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique breed identifier' },
            name: { type: 'string', description: 'Breed name' },
            description: { type: 'string', description: 'Breed description' },
            temperament: { type: 'string', description: 'Breed temperament' },
            origin: { type: 'string', description: 'Country of origin' },
            lifeSpan: { type: 'string', description: 'Life span range' },
            weight: {
              type: 'object',
              properties: {
                imperial: { type: 'string', description: 'Weight in pounds' },
                metric: { type: 'string', description: 'Weight in kilograms' }
              }
            },
            adaptability: { type: 'integer', minimum: 0, maximum: 5 },
            affectionLevel: { type: 'integer', minimum: 0, maximum: 5 },
            childFriendly: { type: 'integer', minimum: 0, maximum: 5 },
            dogFriendly: { type: 'integer', minimum: 0, maximum: 5 },
            energyLevel: { type: 'integer', minimum: 0, maximum: 5 },
            grooming: { type: 'integer', minimum: 0, maximum: 5 },
            healthIssues: { type: 'integer', minimum: 0, maximum: 5 },
            intelligence: { type: 'integer', minimum: 0, maximum: 5 },
            sheddingLevel: { type: 'integer', minimum: 0, maximum: 5 },
            socialNeeds: { type: 'integer', minimum: 0, maximum: 5 },
            strangerFriendly: { type: 'integer', minimum: 0, maximum: 5 },
            vocalisation: { type: 'integer', minimum: 0, maximum: 5 }
          }
        },
        Image: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique image identifier' },
            url: { type: 'string', format: 'uri', description: 'Image URL' },
            width: { type: 'integer', description: 'Image width in pixels' },
            height: { type: 'integer', description: 'Image height in pixels' },
            breeds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Associated breed IDs'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique user identifier' },
            email: { type: 'string', format: 'email', description: 'User email' },
            firstName: { type: 'string', description: 'User first name' },
            lastName: { type: 'string', description: 'User last name' },
            isActive: { type: 'boolean', description: 'User active status' },
            favoriteBreeds: {
              type: 'array',
              items: { type: 'string' },
              description: 'User favorite breed IDs'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT access token' },
            refreshToken: { type: 'string', description: 'JWT refresh token' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', description: 'Error code' },
            message: { type: 'string', description: 'Error message' },
            details: { type: 'object', description: 'Additional error details' }
          }
        }
      }
    },
    tags: [
      {
        name: 'Breeds',
        description: 'Cat breeds management endpoints'
      },
      {
        name: 'Images',
        description: 'Cat images management endpoints'
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      }
    ]
  },
  apis: ['./src/presentation/routes/*.ts'], // Path to the API files
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Cat Breeds API Documentation'
  }));

  // Serve swagger.json
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📚 Swagger documentation available at /api-docs');
};