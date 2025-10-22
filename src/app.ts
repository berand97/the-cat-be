import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { 
  errorMiddleware, 
  loggingMiddleware, 
  generalLimiter 
} from '@presentation/middlewares/index.js';
import apiRoutes from '@presentation/routes/index.js';
import { config } from '@config/index.js';
import { setupSwagger } from '@config/swagger.js';

export const createApp = (): Express => {
  const app = express();
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors({
    origin: config.security.cors.origin,
    credentials: config.security.cors.credentials,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  if (config.server.nodeEnv !== 'test') {
    app.use(morgan('combined'));
    app.use(loggingMiddleware);
  }

  app.use(generalLimiter);

  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Cat Breeds API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: config.server.nodeEnv
    });
  });

  setupSwagger(app);

  app.use('/api', apiRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    });
  });
  
  app.use(errorMiddleware);

  return app;
};